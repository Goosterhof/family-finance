<template>
    <main class="page-center">
        <article class="sign-up">
            <h1 class="sign-up__title">Family Finance</h1>
            <p class="sign-up__subtitle">Begin hier aan je financiele avontuur</p>
            <form class="sign-up-form form" @submit.prevent="register(credentials)">
                <label class="form-label-wrapper">
                    <p class="form-label">Voornaam</p>
                    <input class="form-input" type="text" placeholder="Je voornaam" required />
                </label>
                <label class="form-label-wrapper">
                    <p class="form-label">Achternaam</p>
                    <input class="form-input" type="text" placeholder="Je achternaam" required />
                </label>
                <label class="form-label-wrapper">
                    <p class="form-label">Familie</p>
                    <input class="form-input" type="text" placeholder="Tot welke familie je behoort" required />
                </label>
                <label class="form-label-wrapper">
                    <p class="form-label">Email</p>
                    <input
                        v-model="credentials.email"
                        class="form-input"
                        type="email"
                        placeholder="Je email"
                        required
                    />
                </label>
                <label class="form-label-wrapper">
                    <p class="form-label">Wachtwoord</p>
                    <input
                        v-model="credentials.password"
                        class="form-input"
                        type="password"
                        autocomplete="new-password"
                        placeholder="Je wachtwoord"
                        required
                    />
                </label>

                <label class="form-label-wrapper">
                    <p class="form-label">Wachtwoord herhalen</p>
                    <input
                        v-model="credentials.repeat_password"
                        class="form-input"
                        type="password"
                        autocomplete="new-password"
                        placeholder="Je wachtwoord"
                        required
                    />
                </label>
                <label class="form-checkbox-wrapper">
                    <input v-model="credentials.rememberMe" class="form-checkbox" type="checkbox" required />
                    <span class="form-checkbox-label">Herinner mij de volgende keer</span>
                </label>
                <button class="form-btn primary-default-btn transparent-btn">Registreer</button>
            </form>
        </article>
    </main>
</template>

<script setup lang="ts">
import {register} from 'services/auth';
import {reactive} from 'vue';

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
