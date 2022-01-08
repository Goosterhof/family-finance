<template>
    <div class="mb-3">
        <label class="form-label">Email</label>
        <input
            class="form-control"
            type="email"
            autocomplete="email"
            placeholder="Je email"
            required
            :value="modelValue"
            @input="update"
        />
    </div>
</template>

<script setup lang="ts">
defineProps({
    modelValue: {type: String, required: true},
});

const emits = defineEmits(['update:modelValue']);

const update = ({target}: Event) => {
    if (!target || !(target instanceof HTMLInputElement)) return;
    emits('update:modelValue', target.value);
};
</script>
