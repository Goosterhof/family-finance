<template>
    <CenterForm @submit.prevent="register(credentials)">
        <BaseTextInput v-model="credentials.firstName" label="Voornaam" placeholder="Je voornaam" />
        <BaseTextInput v-model="credentials.lastName" label="Achternaam" placeholder="Je achternaam" />
        <BaseTextInput v-model="credentials.family" label="Familie" placeholder="Tot welke familie je behoort" />
        <BaseEmailInput v-model="credentials.email" />
        <BasePasswordInput v-model="credentials.password" autocomplete="new-password" />
        <BasePasswordInput
            v-model="credentials.repeatPassword"
            autocomplete="new-password"
            placeholder="Herhaal je wachtwoord"
            label="Wachtwoord herhalen"
        />
        <BaseCheckboxInput v-model="credentials.rememberMe" label="Herinner mij de volgende keer" />

        <TheSubmitButton btn-text="Registreer" />
    </CenterForm>
</template>

<script setup lang="ts">
import {reactive} from 'vue';
import {register} from 'services/auth';
import BaseCheckboxInput from 'components/base/BaseCheckboxInput.vue';
import BaseEmailInput from 'components/base/BaseEmailInput.vue';
import BasePasswordInput from 'components/base/BasePasswordInput.vue';
import BaseTextInput from 'components/base/BaseTextInput.vue';
import CenterForm from 'layouts/CenterForm.vue';
import TheSubmitButton from 'components/TheSubmitButton.vue';

const credentials = reactive({
    firstName: '',
    lastName: '',
    family: '',
    email: '',
    password: '',
    repeatPassword: '',
    rememberMe: true,
});
</script>
