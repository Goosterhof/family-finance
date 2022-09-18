<template>
    <li class="list-group-item pe-0">
        <form @submit.prevent="submitNewCategory">
            <input v-model="newCategoryName" class="form-control" type="text" placeholder="Categorie naam" required />
        </form>
    </li>
</template>

<script setup lang="ts">
import {Category} from 'types/models/category';
import {New} from 'types/generics';
import {categoryRepository} from 'domains/categories';
import {ref} from 'vue';
import {successToast} from 'services/toast';

const props = defineProps<{categoryId: number | null}>();
const emit = defineEmits<{(name: 'done'): void}>();

const newCategoryName = ref('');

const submitNewCategory = async () => {
    const data: New<Category> = {name: newCategoryName.value, children: [], categoryId: props.categoryId};
    await categoryRepository.create(data);
    successToast('Categorie aangemaakt');
    await categoryRepository.getAll();
    emit('done');
};
</script>
