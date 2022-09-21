<template>
    <p>Afschriften</p>

    <!-- TODO :: make pretty -->
    <form v-if="!Object.values(statementsPerAccountName).length" @submit.prevent="getCSVAndParseIt">
        <input ref="csvInput" type="file" accept=".csv" />
        <input type="submit" value="Submit" />
    </form>

    <template v-else>
        <h1 class="h2">
            {{ Object.values(statementsPerAccountName)[0][0].account }}
        </h1>

        <div
            v-for="(statements, toAccountName) in statementsPerAccountName"
            :key="toAccountName"
            class="card mb-2 pb-2"
        >
            <div class="card-header">
                <h6 class="card-subtitle">{{ toAccountName }}</h6>
            </div>
            <div v-for="statement in statements" :key="statement.description" class="card ms-2 me-2 mt-2">
                <div class="card-body">
                    <div>
                        <span
                            :style="{
                                color: statement.amount < 0 ? 'red' : 'green',
                            }"
                        >
                            €{{ statement.amount }}
                        </span>
                        <span class="ms-2">
                            <select v-model="statement.categoryId">
                                <option disabled :value="0">Nog geen optie toegevoegd</option>
                                <option v-for="category in categories" :key="category.id" :value="category.id">
                                    {{ category.name }}
                                </option>
                            </select>
                        </span>
                    </div>
                    {{ statement.description }}
                </div>
            </div>
        </div>
    </template>
</template>

<script setup lang="ts">
import {New} from 'types/generics';
import {Statement} from '../types';
import {categoryRepository, categoryStoreModule} from 'domains/categories';
import {parseCSV} from 'helpers/csv';
import {ref, watchEffect} from 'vue';

const FIRST_FILE_INDEX = 0;

const csvInput = ref<HTMLInputElement>();
const statementsPerAccountName = ref<Record<string, New<Statement>[]>>({});

const accountToCategory: Record<string, number> = {};

watchEffect(() => {
    const allStatements = Object.values(statementsPerAccountName.value).flat();
    for (const statement of allStatements) {
        if (statement.categoryId) {
            accountToCategory[statement.toAccount] = statement.categoryId;
            continue;
        }
        if (accountToCategory[statement.toAccount]) {
            statement.categoryId = accountToCategory[statement.toAccount];
            continue;
        }
        const speculatedCategoryId = allStatements.find(
            ({toAccount, categoryId}) => toAccount === statement.toAccount && categoryId,
        )?.categoryId;
        if (!speculatedCategoryId) continue;
        statement.categoryId = speculatedCategoryId;
    }
});

categoryRepository.getAll();
const categories = categoryStoreModule.all;

const getCSVAndParseIt = () => {
    if (!csvInput.value || !csvInput.value.files) return;
    const input = csvInput.value.files[FIRST_FILE_INDEX];
    if (!input) return;
    const reader = new FileReader();

    reader.onload = ({target}: ProgressEvent<FileReader>) => {
        if (!target || !target.result) return;
        const text = target.result;
        const statements = parseCSV(text.toString());

        statementsPerAccountName.value = statements.reduce<Record<string, New<Statement>[]>>((acc, statement) => {
            if (!acc[statement.toAccountName]) acc[statement.toAccountName] = [];
            acc[statement.toAccountName].push(statement);
            return acc;
        }, {});
    };

    reader.readAsText(input);
};
</script>
