<template>
    <li class="list-group-item pe-0">
        <form @submit.prevent="submitNewCategory">
            <input v-model="newCategoryName" class="form-control" type="text" placeholder="Categorie naam" required />
        </form>
    </li>
</template>

<script setup lang="ts">
import {addToCategoryId, categoryRepository} from 'modules/categories';
import {NewCategory} from 'types/models/category';
import {ref} from 'vue';

const newCategoryName = ref('');

const submitNewCategory = async () => {
    const data: NewCategory = {name: newCategoryName.value};
    if (addToCategoryId.value > 0) data.category_id = addToCategoryId.value;
    await categoryRepository.create(data);
    await categoryRepository.getAll();
    newCategoryName.value = '';
    addToCategoryId.value = -1;
};
</script>
