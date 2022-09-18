<template>
    <p>Afschriften</p>
    <!-- TODO :: make pretty -->
    <form @submit.prevent="getCSVAndParseIt">
        <input ref="csvInput" type="file" accept=".csv" />
        <input type="submit" value="Submit" />
    </form>

    <table>
        <thead>
            <tr>
                <th>Rekening</th>
                <th>Datum</th>
                <th>Bedrag</th>
                <th>Naar rekening</th>
                <th>Naar rekening van</th>
                <th>Beschrijving</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="statement in statements" :key="statement.bankId">
                <td>{{ statement.account }}</td>
                <td>{{ statement.transactionDate }}</td>
                <td>{{ statement.amount }}</td>
                <td>{{ statement.toAccount }}</td>
                <td>{{ statement.toAccountName }}</td>
                <td>{{ statement.description }}</td>
            </tr>
        </tbody>
    </table>
</template>

<script setup lang="ts">
import {New} from 'types/generics';
import {Statement} from '../types';
import {parseCSV} from 'helpers/csv';
import {ref} from 'vue';

const FIRST_FILE_INDEX = 0;

const csvInput = ref<HTMLInputElement>();
const statements = ref<New<Statement>[]>([]);

const getCSVAndParseIt = () => {
    if (!csvInput.value || !csvInput.value.files) return;
    const input = csvInput.value.files[FIRST_FILE_INDEX];
    if (!input) return;
    const reader = new FileReader();

    reader.onload = ({target}: ProgressEvent<FileReader>) => {
        if (!target || !target.result) return;
        const text = target.result;
        statements.value = parseCSV(text.toString());
    };

    reader.readAsText(input);
};
</script>
