<template>
    <CenterForm @submit.prevent="register(credentials)">
        <div class="mb-3">
            <label class="form-label">Voornaam</label>
            <input class="form-control" type="text" placeholder="Je voornaam" required />
        </div>
        <div class="mb-3">
            <label class="form-label">Achternaam</label>
            <input class="form-control" type="text" placeholder="Je achternaam" required />
        </div>
        <div class="mb-3">
            <label class="form-label">Familie</label>
            <input class="form-control" type="text" placeholder="Tot welke familie je behoort" required />
        </div>
        <div class="mb-3">
            <label class="form-label">Email</label>
            <input v-model="credentials.email" class="form-control" type="email" placeholder="Je email" required />
        </div>
        <div class="mb-3">
            <label class="form-label">Wachtwoord</label>
            <input
                v-model="credentials.password"
                class="form-control"
                type="password"
                autocomplete="new-password"
                placeholder="Je wachtwoord"
                required
            />
        </div>

        <div class="mb-3">
            <label class="form-label">Wachtwoord herhalen</label>
            <input
                v-model="credentials.repeat_password"
                class="form-control"
                type="password"
                autocomplete="new-password"
                placeholder="Je wachtwoord"
                required
            />
        </div>

        <div class="mb-3 form-check">
            <input v-model="credentials.rememberMe" class="form-check-input" type="checkbox" required />
            <label class="form-check-label">Herinner mij de volgende keer</label>
        </div>
        <button type="submit" class="btn btn-primary">Registreer</button>
    </CenterForm>
</template>

<script setup lang="ts">
import {register} from 'services/auth';
import {reactive} from 'vue';
import CenterForm from 'layouts/CenterForm.vue';

const credentials = reactive({
    first_name: '',
    last_name: '',
    family: '',
    email: '',
    password: '',
    repeat_password: '',
    rememberMe: true,
});
</script>
