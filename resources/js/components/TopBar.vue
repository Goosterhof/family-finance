<template>
    <nav class="navbar navbar-light bg-light p-3">
        <div class="d-flex col-12 col-md-3 col-lg-2 mb-2 mb-lg-0 flex-wrap flex-md-nowrap justify-content-between">
            <router-link class="navbar-brand" :to="{name: 'Home'}">Family Finance</router-link>
        </div>
        <div class="col-12 col-md-4 col-lg-2">
            <input class="form-control form-control-dark" type="text" placeholder="Zoeken" aria-label="Search" />
        </div>
        <div
            v-if="loggedInUser"
            class="col-12 col-md-5 col-lg-8 d-flex align-items-center justify-content-md-end mt-3 mt-md-0"
        >
            <div class="dropdown">
                <button
                    class="btn btn-secondary dropdown-toggle"
                    type="button"
                    :class="{show: profileDropdown}"
                    @click="profileDropdown = !profileDropdown"
                >
                    Hallo, {{ loggedInUser.firstName }}
                </button>
                <ul class="dropdown-menu" :class="{show: profileDropdown}">
                    <li><router-link class="dropdown-item" :to="{name: 'Profile'}">Profiel</router-link></li>
                    <!-- <li><a class="dropdown-item" href="#">Settings</a></li>
                    <li><a class="dropdown-item" href="#">Messages</a></li> -->
                    <li><span role="button" class="dropdown-item" @click="logout">Uitloggen</span></li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
import {getCurrentRoute} from 'services/router';
import {loggedInUser, logout} from 'services/auth';
import {ref, watch} from 'vue';

const profileDropdown = ref(false);

watch(
    () => getCurrentRoute().value,
    () => (profileDropdown.value = false),
);
</script>

<style scoped>
.navbar {
    box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.1);
}

@media (min-width: 767.98px) {
    .navbar {
        top: 0;
        position: sticky;
        z-index: 999;
    }
}
</style>
