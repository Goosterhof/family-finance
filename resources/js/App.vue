<template>
    <TheNavbar v-if="isLoggedIn" />
    <Suspense>
        <template #default>
            <router-view />
        </template>
        <template #fallback>Loading...</template>
    </Suspense>
</template>

<script setup lang="ts">
import TheNavbar from 'components/Navbar.vue';
import {isLoggedIn} from 'services/auth';
</script>

<style>
body {
    /* padding: 0;
    margin: 0; */
    min-height: 100vh;
}

#app {
    min-height: 100vh;
}
</style>
