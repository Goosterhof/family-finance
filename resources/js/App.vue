<template>
    <div id="wrapper" :class="bodyClass">
        <!-- <TheNavbar v-if="isLoggedIn" /> -->
        <TheNavbar />
        <div id="content-wrapper">
            <div id="content" class="container ml-0">
                <Suspense>
                    <template #default>
                        <router-view />
                    </template>
                    <template #fallback>Loading...</template>
                </Suspense>
            </div>
        </div>
    </div>
</template>

<script setup>
import TheNavbar from 'admin/components/Navbar.vue';
import {getCurrentRouteName} from 'services/router';
import {computed} from 'vue';

const bodyClass = computed(() => getCurrentRouteName()?.replace(/\./g, '-').toLowerCase());
</script>
