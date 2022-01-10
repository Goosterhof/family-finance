<template>
    <template v-if="isLoggedIn">
        <TopBar />
        <div class="container-fluid">
            <div class="row">
                <SideBar />
                <Suspense>
                    <template #default>
                        <router-view class="col-md-9 ms-sm-auto col-lg-10 px-md-4 py-4" />
                    </template>
                    <template #fallback>
                        <div class="col-md-9 ms-sm-auto col-lg-10 px-md-4 py-4">Loading...</div>
                    </template>
                </Suspense>
            </div>
        </div>
    </template>
    <router-view v-else />
</template>

<script setup lang="ts">
import TopBar from 'components/TopBar.vue';
import {isLoggedIn} from 'services/auth';
import SideBar from 'components/SideBar.vue';
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
