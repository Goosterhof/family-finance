<template>
    <div class="page-center">
        <div class="sign-up">
            <h1 class="sign-up__title">Family Finance</h1>
            <p class="sign-up__subtitle">Ga verder met je financiele avontuur</p>
            <form class="sign-up-form form" @submit.prevent="login(credentials)">
                <label class="form-label-wrapper">
                    <p class="form-label">Email</p>
                    <input
                        v-model="credentials.email"
                        class="form-input"
                        type="email"
                        placeholder="Enter your email"
                        required
                    />
                </label>
                <label class="form-label-wrapper">
                    <p class="form-label">Wachtwoord</p>
                    <input
                        v-model="credentials.password"
                        class="form-input"
                        type="password"
                        placeholder="Enter your password"
                        required
                    />
                </label>
                <router-link class="link-info forget-link" :to="{name: FORGOT_PASSWORD_ROUTE_NAME}">
                    Wachtwoord vergeten?
                </router-link>
                <label class="form-checkbox-wrapper">
                    <input v-model="credentials.rememberMe" class="form-checkbox" type="checkbox" required />
                    <span class="form-checkbox-label">Herinner mij de volgende keer</span>
                </label>
                <button class="form-btn primary-default-btn transparent-btn" style="margin-bottom: 20px">
                    Inloggen
                </button>
                <router-link :to="{name: REGISTER_ROUTE_NAME}" class="form-btn primary-default-btn transparent-btn">
                    Registreren
                </router-link>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import {login, FORGOT_PASSWORD_ROUTE_NAME, REGISTER_ROUTE_NAME} from 'services/auth';
import {reactive} from 'vue';

const credentials = reactive({email: '', password: '', rememberMe: true});
</script>
