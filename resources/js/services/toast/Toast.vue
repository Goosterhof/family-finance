<template>
    <div class="toast fade" :class="[`bg-${toast.variant}`, toast.show ? 'show' : 'hide']" style="z-index: 9999">
        <div class="toast-header border-bottom-0">
            <button class="btn-close m-auto me-2" @click="$emit('hide')" />
        </div>
        <div class="toast-body" style="background-color: rgba(255, 255, 255, 0.5)">
            {{ toast.message }}
        </div>
    </div>
</template>

<script setup lang="ts">
import {PropType} from 'vue';
import {Toast} from 'types/services';

defineProps({
    toast: {
        required: true,
        type: Object as PropType<Toast>,
    },
});

defineEmits(['hide']);
</script>
