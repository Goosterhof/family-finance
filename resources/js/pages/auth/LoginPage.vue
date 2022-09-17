<template>
    <CenterForm @submit.prevent="login(credentials)">
        <BaseEmailInput v-model="credentials.email" />
        <BasePasswordInput v-model="credentials.password" />
        <BaseCheckboxInput v-model="credentials.rememberMe" label="Herinner mij de volgende keer" />
        <TheSubmitButton btn-text="Inloggen" />
        <div class="mb-3 d-grid">
            <router-link :to="{name: REGISTER_ROUTE_NAME}" class="btn btn-secondary">Registreren</router-link>
        </div>
        <div class="mb-3 text-center">
            <router-link :to="{name: FORGOT_PASSWORD_ROUTE_NAME}">Wachtwoord vergeten?</router-link>
        </div>
    </CenterForm>
</template>

<script setup lang="ts">
import {FORGOT_PASSWORD_ROUTE_NAME, REGISTER_ROUTE_NAME, login} from 'services/auth';
import {reactive} from 'vue';
import BaseCheckboxInput from '../../components/base/BaseCheckboxInput.vue';
import BaseEmailInput from '../../components/base/BaseEmailInput.vue';
import BasePasswordInput from '../../components/base/BasePasswordInput.vue';
import CenterForm from 'layouts/CenterForm.vue';
import TheSubmitButton from 'components/TheSubmitButton.vue';

const credentials = reactive({email: '', password: '', rememberMe: true});
</script>
