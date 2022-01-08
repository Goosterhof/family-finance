<template>
    <div class="mb-3">
        <label class="form-label">{{ label }}</label>
        <input
            class="form-control"
            type="password"
            :placeholder="placeholder"
            :autocomplete="autocomplete"
            required
            :value="modelValue"
            @input="update"
        />
    </div>
</template>

<script setup lang="ts">
defineProps({
    modelValue: {type: String, required: true},
    label: {type: String, default: 'Wachtwoord'},
    placeholder: {type: String, default: 'Je wachtwoord'},
    autocomplete: {type: String, default: 'password'},
});

const emits = defineEmits(['update:modelValue']);

const update = ({target}: Event) => {
    if (!target || !(target instanceof HTMLInputElement)) return;
    emits('update:modelValue', target.value);
};
</script>
