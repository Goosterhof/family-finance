<template>
    <p>Afschriften</p>
    <form @submit.prevent="test">
        <input ref="csvInput" type="file" accept=".csv" />
        <br />
        <input type="submit" value="Submit" />
    </form>
</template>

<script setup lang="ts">
import {parseCSV} from 'helpers/csv';
import {ref} from 'vue';

const csvInput = ref<HTMLInputElement>();

const test = () => {
    if (!csvInput.value || !csvInput.value.files) return;
    const input = csvInput.value.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        const text = e.target.result;
        console.log(parseCSV(text));
    };

    reader.readAsText(input);
};
</script>
