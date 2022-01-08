<template>
    <CenterForm @submit.prevent="register(credentials)">
        <BaseTextInput v-model="credentials.first_name" label="Voornaam" placeholder="Je voornaam" />
        <BaseTextInput v-model="credentials.last_name" label="Achternaam" placeholder="Je achternaam" />
        <BaseTextInput v-model="credentials.last_name" label="Familie" placeholder="Tot welke familie je behoort" />
        <BaseEmailInput v-model="credentials.email" />
        <BasePasswordInput v-model="credentials.password" autocomplete="new-password" />
        <BasePasswordInput
            v-model="credentials.repeat_password"
            autocomplete="new-password"
            placeholder="Herhaal je wachtwoord"
            label="Wachtwoord herhalen"
        />
        <BaseCheckboxInput v-model="credentials.rememberMe" label="Herinner mij de volgende keer" />

        <TheSubmitButton btn-text="Registreer" />
    </CenterForm>
</template>

<script setup lang="ts">
import {register} from 'services/auth';
import {reactive} from 'vue';
import CenterForm from 'layouts/CenterForm.vue';
import BaseTextInput from 'components/base/BaseTextInput.vue';
import BaseEmailInput from 'components/base/BaseEmailInput.vue';
import BasePasswordInput from 'components/base/BasePasswordInput.vue';
import BaseCheckboxInput from 'components/base/BaseCheckboxInput.vue';
import TheSubmitButton from 'components/TheSubmitButton.vue';

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
