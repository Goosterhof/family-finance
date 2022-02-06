<template>
    <li v-for="category in categories" :key="category.id" class="list-group-item pe-0">
        <div class="d-flex justify-content-between align-items-center">
            {{ category.name }}
            <button class="btn btn-sm" @click="addCategory = category.id">Subcategorie toevoegen</button>
        </div>
        <ul class="list-group list-group-flush">
            <li v-if="addCategory === category.id" class="list-group-item pe-0">
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
            <CategoryList v-if="category.children.length" :categories="category.children" />
        </ul>
    </li>
</template>

<script lang="ts">
import {categoryRepository} from 'modules/categories';
import {Category} from 'types/models/category';
import {defineComponent, PropType, ref} from 'vue';

const CategoryList = defineComponent({
    props: {
        categories: {
            type: Array as PropType<Category[]>,
            required: true,
        },
    },
    setup() {
        const newCategoryName = ref('');
        const addCategory = ref(0);
        const submitNewCategory = async () => {
            await categoryRepository.create({name: newCategoryName.value, category_id: addCategory.value});
            await categoryRepository.getAll();
            addCategory.value = 0;
            newCategoryName.value = '';
        };
        return {newCategoryName, addCategory, submitNewCategory};
    },
});

CategoryList.components = {CategoryList};

export default CategoryList;
</script>
