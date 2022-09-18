<template>
    <h1 class="h2">Profiel</h1>
    <p>Dit is je profiel pagina waar je je gegevens kan aanpassen</p>
    <div v-if="loggedInUser" class="row">
        <div class="col-12 col-xl-6">
            <CategoryCard />
        </div>
        <div class="col-12 col-xl-4 mb-4 mb-lg-0">
            <div class="card">
                <h5 class="card-header d-flex justify-content-between align-items-center">
                    Familieleden
                    <button class="btn btn-sm btn-primary">Uitnodigen</button>
                </h5>

                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">Naam</th>
                                    <th scope="col">Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="{firstName, lastName, email, id} in loggedInUser.familyMembers" :key="id">
                                    <th scope="row">{{ firstName }} {{ lastName }}</th>
                                    <td>{{ email }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {loggedInUser} from 'services/auth';
import CategoryCard from 'components/categories/CategoryCard.vue';
</script>
