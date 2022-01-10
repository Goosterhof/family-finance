<template>
    <div class="mb-3 form-check">
        <input class="form-check-input" type="checkbox" :required="required" :checked="modelValue" @input="update" />
        <label class="form-check-label">{{ label }}</label>
    </div>
</template>

<script setup lang="ts">
defineProps({
    label: {type: String, required: true},
    modelValue: {type: Boolean, required: true},

    required: {type: Boolean, default: true},
});

const emits = defineEmits(['update:modelValue']);

const update = ({target}: Event) => {
    if (!target || !(target instanceof HTMLInputElement)) return;
    emits('update:modelValue', target.checked);
};
</script>
