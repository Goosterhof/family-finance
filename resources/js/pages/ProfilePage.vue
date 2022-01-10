<template>
    <h1 class="h2">Profiel</h1>
    <p>Dit is je profiel pagina waar je je gegevens kan aanpassen</p>
    <div class="row">
        <div class="col-12 col-xl-8 mb-4 mb-lg-0">
            <div class="card">
                <h5 class="card-header">Familieleden</h5>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">Naam</th>
                                    <th scope="col">Email</th>
                                    <th scope="col"><button class="btn btn-sm btn-primary">Uitnodigen</button></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="{first_name, last_name, email, id} in loggedInUser.family_members" :key="id">
                                    <th scope="row">{{ first_name }} {{ last_name }}</th>
                                    <td>{{ email }}</td>
                                    <td><a href="#" class="btn btn-sm btn-secondary">View</a></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-12 col-xl-4">
            <div class="card">
                <h5 class="card-header">Traffic last 6 months</h5>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {loggedInUser} from 'services/auth';
</script>
