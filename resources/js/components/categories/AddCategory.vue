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
import {addToCategoryId, categoryRepository} from 'modules/categories';
import {ref} from 'vue';

const newCategoryName = ref('');

const submitNewCategory = async () => {
    const data: New<Category> = {name: newCategoryName.value, children: [], categoryId: addToCategoryId.value};
    await categoryRepository.create(data);
    await categoryRepository.getAll();
};
</script>
