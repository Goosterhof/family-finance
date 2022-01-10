<template>
    <div class="mb-3 d-grid">
        <button type="submit" class="btn btn-primary">{{ btnText }}</button>
    </div>
</template>

<script setup lang="ts">
defineProps({btnText: {type: String, required: true}});
</script>
