<template>
    <div class="d-flex justify-content-between align-items-center">
        <h1 class="h1">Afschriften</h1>
        <button v-if="statements.length" class="btn btn-primary" @click="saveStatements">Opslaan</button>
    </div>

    <form v-if="!statements.length">
        <input ref="csvInput" type="file" accept=".csv" @input="getCSVAndParseIt" />
    </form>

    <template v-else>
        <div class="d-flex justify-content-between align-items-center">
            <h1 class="h2">
                {{ statements[0].account }}
            </h1>
            <BasePriceTag :price="totalOveral" />
        </div>

        <div
            v-for="(statementsForAccountName, toAccountName, index) in statementsPerAccountName"
            :key="toAccountName"
            class="card mb-2 pb-2"
        >
            <div
                class="card-header d-flex justify-content-between align-items-center"
                @click="toggleCollapsable(index)"
            >
                <h6 class="card-subtitle">{{ toAccountName }}</h6>
                <BasePriceTag :price="totalPerAccountName[toAccountName]" />
            </div>
            <div ref="collapsableElements">
                <div
                    v-for="statement in statementsForAccountName"
                    :key="statement.description"
                    class="card ms-2 me-2 mt-2"
                    :style="{backgroundColor: 'rgba(222,2,2,0.1)'}"
                >
                    <div class="card-body">
                        <div>
                            <BasePriceTag :price="statement.amount" />
                            <select v-model="statement.categoryId" class="ms-2">
                                <option disabled :value="0">Nog geen optie toegevoegd</option>
                                <option v-for="category in categories" :key="category.id" :value="category.id">
                                    {{ category.name }}
                                </option>
                            </select>
                            <span v-if="knownStatements[statement.bankId]" class="ms-2 bold">Afschrift al bekend</span>
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
import {categoryRepository, categoryStoreModule} from 'domains/categories';
import {parseCSV} from 'helpers/csv';
import {reactive, ref, watchEffect} from 'vue';
import {statementRepository, statementStoreModule} from '../';
import {successToast} from 'services/toast';
import BasePriceTag from 'components/base/BasePriceTag.vue';

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
const knownStatements = reactive<Record<string, boolean>>({});

const totalOveral = ref(TOTAL_START_COUNT);

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
            totalOveral.value += statement.amount;

            knownStatements[statement.bankId] = statementStoreModule.all.value.some(
                ({bankId}) => bankId === statement.bankId,
            );
        }
    };

    reader.readAsText(input);
};

const saveStatements = async () => {
    await statementRepository.massCreate(statements.value);
    successToast('Afschriften zijn opgeslagen');
};
</script>
