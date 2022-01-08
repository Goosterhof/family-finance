<template>
    <div class="mb-3">
        <label class="form-label">{{ label }}</label>
        <input
            class="form-control"
            type="text"
            :placeholder="placeholder"
            :required="required"
            :value="modelValue"
            @input="update"
        />
    </div>
</template>

<script setup lang="ts">
defineProps({
    label: {type: String, required: true},
    placeholder: {type: String, required: true},
    modelValue: {type: String, required: true},

    required: {type: Boolean, default: true},
});

const emits = defineEmits(['update:modelValue']);

const update = ({target}: Event) => {
    if (!target || !(target instanceof HTMLInputElement)) return;
    emits('update:modelValue', target.value);
};
</script>
