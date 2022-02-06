<template>
    <div class="card">
        <h5 class="card-header d-flex justify-content-between align-items-center">
            Categorieën
            <button class="btn btn-sm btn-primary" @click="addCategory = 0">Hoofdcategorie toevoegen</button>
        </h5>
        <div class="card-body">
            <ul class="list-group list-group-flush">
                <AddCategory v-if="addCategory === 0" v-model="addCategory" />
                <CategoryList :categories="categories" />
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import {categoryRepository, categoryStoreModule} from 'modules/categories';
import {ref} from 'vue';
import CategoryList from './CategoryList.vue';
import AddCategory from './AddCategory.vue';

categoryRepository.getAll();

const categories = categoryStoreModule.all;

const addCategory = ref(-1);
</script>
