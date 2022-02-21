<template>
    <component :is="component" v-if="component" />
    <div v-else>404</div>
</template>

<script setup lang="ts">
import {getCurrentRoute} from 'services/router';
import {computed} from 'vue';

const props = defineProps({depth: {type: Number, default: 0}});

const component = computed(() => {
    const matched = getCurrentRoute().value.matched[props.depth];
    return matched && matched.components.default;
});
</script>
