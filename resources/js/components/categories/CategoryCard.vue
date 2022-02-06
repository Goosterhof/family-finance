<template>
    <div class="card">
        <h5 class="card-header d-flex justify-content-between align-items-center">
            Categorieën
            <button class="btn btn-sm btn-primary" @click="addCategory = true">Hoofdcategorie toevoegen</button>
        </h5>
        <div class="card-body">
            <ul class="list-group list-group-flush">
                <li v-if="addCategory" class="list-group-item pe-0">
                    <form @submit.prevent="submitNewCategory">
                        <input
                            v-model="newCategoryName"
                            class="form-control"
                            type="text"
                            placeholder="Categorie naam"
                            required
                        />
                    </form>
                </li>
                <CategoryList :categories="categories" />
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import {Category} from 'types/models/category';
import {PropType, ref} from 'vue';
import CategoryList from './CategoryList.vue';

defineProps({
    categories: {
        type: Array as PropType<Category[]>,
        required: true,
    },
});

const newCategoryName = ref('');
const addCategory = ref(false);

const submitNewCategory = async () => {
    addCategory.value = false;
    newCategoryName.value = '';
};
</script>
