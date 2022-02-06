<template>
    <li v-for="category in categories" :key="category.id" class="list-group-item pe-0">
        <div class="d-flex justify-content-between align-items-center">
            {{ category.name }}
            <button class="btn btn-sm" @click="addToCategoryId = category.id"><PlusIcon /></button>
        </div>
        <ul class="list-group list-group-flush">
            <AddCategory v-if="addToCategoryId === category.id" />
            <CategoryList v-if="category.children.length" :categories="category.children" />
        </ul>
    </li>
</template>

<script lang="ts">
import {Category} from 'types/models/category';
import {defineComponent, PropType} from 'vue';
import AddCategory from './AddCategory.vue';
import PlusIcon from 'icons/PlusIcon.vue';
import {addToCategoryId} from 'modules/categories';

const CategoryList = defineComponent({
    props: {
        categories: {
            type: Array as PropType<Category[]>,
            required: true,
        },
    },
    setup() {
        return {addToCategoryId};
    },
});
CategoryList.components = {CategoryList, AddCategory, PlusIcon};

export default CategoryList;
</script>

<style scoped>
button:focus {
    box-shadow: none;
}
</style>
