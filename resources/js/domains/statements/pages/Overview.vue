<template>
    <h1 class="h1">Afschriften</h1>

    <form v-if="!statements.length">
        <input ref="csvInput" type="file" accept=".csv" @input="getCSVAndParseIt" />
    </form>

    <template v-else>
        <div class="d-flex justify-content-between align-items-center">
            <h1 class="h2">
                {{ statements[0].account }}
            </h1>
            <span :style="getStyleForPrice(totalOveral)">€{{ totalOveral }}</span>
        </div>

        <div
            v-for="(statementsForAccountName, toAccountName, index) in statementsPerAccountName"
            :key="toAccountName"
            class="card mb-2 pb-2"
            @click="toggleCollapsable(index)"
        >
            <div class="card-header d-flex justify-content-between align-items-center">
                <h6 class="card-subtitle">{{ toAccountName }}</h6>
                <span :style="getStyleForPrice(totalPerAccountName[toAccountName])">
                    €{{ totalPerAccountName[toAccountName] }}
                </span>
            </div>
            <div ref="collapsableElements">
                <div
                    v-for="statement in statementsForAccountName"
                    :key="statement.description"
                    class="card ms-2 me-2 mt-2"
                >
                    <div class="card-body">
                        <div>
                            <span :style="getStyleForPrice(statement.amount)">€{{ statement.amount }}</span>
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
        </div>
    </template>
</template>

<script setup lang="ts">
import {Collapse} from 'bootstrap';
import {New} from 'types/generics';
import {Statement} from '../types';
import {StyleValue, computed, reactive, ref, watchEffect} from 'vue';
import {categoryRepository, categoryStoreModule} from 'domains/categories';
import {parseCSV} from 'helpers/csv';

const FIRST_FILE_INDEX = 0;
const TOTAL_START_COUNT = 0;

const collapsableElements = ref<HTMLDivElement[]>([]);
const collapsables = ref<Collapse[]>([]);

watchEffect(() => (collapsables.value = collapsableElements.value.map(el => new Collapse(el))));

const toggleCollapsable = (index: number) => collapsables.value[index].toggle();

const csvInput = ref<HTMLInputElement>();
const statements = ref<New<Statement>[]>([]);
const statementsPerAccountName = reactive<Record<string, New<Statement>[]>>({});
const totalPerAccountName = reactive<Record<string, number>>({});

const totalOveral = computed(() => statements.value.reduce((total, {amount}) => total + amount, TOTAL_START_COUNT));

const accountToCategory: Record<string, number> = {};

watchEffect(() => {
    const allStatements = Object.values(statementsPerAccountName).flat();
    for (const statement of allStatements) {
        if (statement.categoryId) {
            accountToCategory[statement.toAccountName] = statement.categoryId;
            continue;
        }
        if (accountToCategory[statement.toAccountName]) {
            statement.categoryId = accountToCategory[statement.toAccountName];
            continue;
        }
        const speculatedCategoryId = allStatements.find(
            ({toAccountName, categoryId}) => toAccountName === statement.toAccountName && categoryId,
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
        statements.value = parseCSV(text.toString());

        for (const statement of statements.value) {
            if (!statementsPerAccountName[statement.toAccountName]) {
                statementsPerAccountName[statement.toAccountName] = [];
                totalPerAccountName[statement.toAccountName] = 0;
            }
            statementsPerAccountName[statement.toAccountName].push(statement);
            totalPerAccountName[statement.toAccountName] += statement.amount;
        }
    };

    reader.readAsText(input);
};

const getStyleForPrice = (price: number): StyleValue => ({
    color: price < TOTAL_START_COUNT ? 'red' : 'green',
});
</script>
