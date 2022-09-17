<template>
    <div class="toast" :class="[`bg-${variant}`, show ? 'show' : 'hide']" style="z-index: 9999">
        <div class="toast-header border-bottom-0">
            <button class="btn-close m-auto me-2" @click="$emit('hide')" />
        </div>
        <div class="toast-body" style="background-color: rgba(255, 255, 255, 0.5)">
            {{ message }}
        </div>
    </div>
</template>

<script setup lang="ts">
import {PropType} from 'vue';
import {ToastVariant} from 'types/types';

defineProps({
    message: {type: String, required: true},
    show: {type: Boolean, required: true},
    variant: {
        type: String as PropType<ToastVariant>,
        required: false,
        default: 'success',
    },
});

defineEmits(['hide']);
</script>
