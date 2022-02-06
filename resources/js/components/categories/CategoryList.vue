<template>
    <li v-for="category in categories" :key="category.id" class="list-group-item pe-0">
        <div class="d-flex justify-content-between align-items-center">
            {{ category.name }}
            <button class="btn btn-sm" @click="addCategory = category.id">Subcategorie toevoegen</button>
        </div>
        <ul class="list-group list-group-flush">
            <AddCategory v-if="addCategory === category.id" v-model="addCategory" />
            <CategoryList v-if="category.children.length" :categories="category.children" />
        </ul>
    </li>
</template>

<script lang="ts">
import {Category} from 'types/models/category';
import {defineComponent, PropType, ref} from 'vue';
import AddCategory from './AddCategory.vue';

const CategoryList = defineComponent({
    props: {
        categories: {
            type: Array as PropType<Category[]>,
            required: true,
        },
    },
    setup() {
        const addCategory = ref(0);
        return {addCategory};
    },
});

CategoryList.components = {CategoryList, AddCategory};

export default CategoryList;
</script>
