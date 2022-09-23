<template>
    <span :style="styleForPrice">€{{ price }}</span>
</template>

<script setup lang="ts">
import {StyleValue, computed} from 'vue';

const props = defineProps<{price:number}>()

const LESS_THEN_THIS_IS_NEGATIVE = 0

const styleForPrice = computed<StyleValue>(() => ({
    color: props.price < LESS_THEN_THIS_IS_NEGATIVE ? 'red' : 'green',
}));
</script>