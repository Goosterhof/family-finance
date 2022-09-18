<template>
    <div class="card">
        <h5 class="card-header d-flex justify-content-between align-items-center">
            Categorieën
            <button class="btn btn-sm btn-primary" @click="addMainCategory = true">Hoofdcategorie toevoegen</button>
        </h5>
        <div class="card-body">
            <ul class="list-group list-group-flush">
                <AddCategory v-if="addMainCategory" :category-id="null" @done="addMainCategory = false" />
                <CategoryList :categories="categoryStoreModule.all.value" />
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import {categoryRepository, categoryStoreModule} from 'domains/categories';
import {ref} from 'vue';
import AddCategory from './AddCategory.vue';
import CategoryList from './CategoryList.vue';

categoryRepository.getAll();

const addMainCategory = ref(false);
</script>
