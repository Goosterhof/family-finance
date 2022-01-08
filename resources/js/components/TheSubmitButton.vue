<template>
    <button type="submit" class="btn btn-primary">{{ btnText }}</button>
</template>

<script setup lang="ts">
defineProps({btnText: {type: String, required: true}});
</script>
