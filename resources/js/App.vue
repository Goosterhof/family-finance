<template>
    <template v-if="isLoggedIn">
        <TopBar />
        <div class="container-fluid">
            <div class="row">
                <SideBar />
                <div class="col-md-9 ms-sm-auto col-lg-10 px-md-4 py-4">
                    <TheBreadcrumb />
                    <Suspense>
                        <template #default>
                            <router-view />
                        </template>
                        <template #fallback>
                            <div class="col-md-9 ms-sm-auto col-lg-10 px-md-4 py-4">Loading...</div>
                        </template>
                    </Suspense>
                </div>
            </div>
        </div>
    </template>
    <router-view v-else />
</template>

<script setup lang="ts">
import {isLoggedIn} from 'services/auth';
import SideBar from 'components/SideBar.vue';
import TheBreadcrumb from 'components/TheBreadcrumb.vue';
import TopBar from 'components/TopBar.vue';
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
