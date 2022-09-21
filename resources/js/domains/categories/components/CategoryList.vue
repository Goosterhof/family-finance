<template>
    <li v-for="category in categories" :key="category.id" class="list-group-item pe-0">
        <div class="d-flex justify-content-between align-items-center">
            {{ category.name }}
            <button class="btn btn-sm" @click="addToCategoryId = category.id"><PlusIcon /></button>
        </div>
        <ul class="list-group list-group-flush">
            <AddCategory
                v-if="addToCategoryId === category.id"
                :category-id="addToCategoryId"
                @done="addToCategoryId = NaN"
            />
            <CategoryList v-if="getChildCategories(category.id).length" :categories="getChildCategories(category.id)" />
        </ul>
    </li>
</template>

<script lang="ts">
import {Category} from '../types';
import {PropType, defineComponent, ref} from 'vue';
import {categoryStoreModule} from '..';
import AddCategory from './AddCategory.vue';
import PlusIcon from 'icons/PlusIcon.vue';

// TODO :: should make a lookup table for parent child
const getChildCategories = (parentCategoryId: number) =>
    categoryStoreModule.all.value.filter(({categoryId}) => parentCategoryId === categoryId);

// eslint-disable-next-line @typescript-eslint/naming-convention
const CategoryList = defineComponent({
    props: {
        categories: {
            type: Array as PropType<Category[]>,
            required: true,
        },
    },
    setup() {
        return {addToCategoryId: ref(NaN), getChildCategories};
    },
});
// eslint-disable-next-line @typescript-eslint/naming-convention
CategoryList.components = {CategoryList, AddCategory, PlusIcon};

export default CategoryList;
</script>

<style scoped>
button:focus {
    box-shadow: none;
}
</style>
