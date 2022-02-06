<template>
    <li class="list-group-item pe-0">
        <form @submit.prevent="submitNewCategory">
            <input v-model="newCategoryName" class="form-control" type="text" placeholder="Categorie naam" required />
        </form>
    </li>
</template>

<script setup lang="ts">
import {categoryRepository} from 'modules/categories';
import {NewCategory} from 'types/models/category';
import {ref} from 'vue';

const props = defineProps({
    modelValue: {
        type: Number,
        required: true,
    },
});

const emit = defineEmits(['update:modelValue']);

const newCategoryName = ref('');

const submitNewCategory = async () => {
    const data: NewCategory = {name: newCategoryName.value};
    if (props.modelValue > 0) data.category_id = props.modelValue;
    await categoryRepository.create(data);
    await categoryRepository.getAll();
    newCategoryName.value = '';
    emit('update:modelValue', -1);
};
</script>
