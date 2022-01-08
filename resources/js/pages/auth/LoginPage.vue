<template>
    <main class="page-center">
        <article class="sign-up">
            <h1 class="sign-up__title">Welcome back!</h1>
            <p class="sign-up__subtitle">Sign in to your account to continue</p>
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
                    <p class="form-label">Password</p>
                    <input
                        v-model="credentials.password"
                        class="form-input"
                        type="password"
                        placeholder="Enter your password"
                        required
                    />
                </label>
                <router-link class="link-info forget-link" :to="{name: FORGOT_PASSWORD_ROUTE_NAME}">
                    Forgot your password?
                </router-link>
                <label class="form-checkbox-wrapper">
                    <input v-model="credentials.rememberMe" class="form-checkbox" type="checkbox" required />
                    <span class="form-checkbox-label">Remember me next time</span>
                </label>
                <button class="form-btn primary-default-btn transparent-btn">Sign in</button>
            </form>
        </article>
    </main>
</template>

<script setup lang="ts">
import {login, FORGOT_PASSWORD_ROUTE_NAME} from 'services/auth';
import {reactive} from 'vue';

const credentials = reactive({email: '', password: '', rememberMe: true});
</script>
