<template>
    <nav class="navbar navbar-light bg-light p-3">
        <div class="d-flex col-12 col-md-3 col-lg-2 mb-2 mb-lg-0 flex-wrap flex-md-nowrap justify-content-between">
            <a class="navbar-brand" href="#">Family Finance</a>
            <button
                class="navbar-toggler d-md-none collapsed mb-3"
                type="button"
                data-toggle="collapse"
                data-target="#sidebar"
                aria-controls="sidebar"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon" />
            </button>
        </div>
        <div class="col-12 col-md-4 col-lg-2">
            <input class="form-control form-control-dark" type="text" placeholder="Zoeken" aria-label="Search" />
        </div>
        <div class="col-12 col-md-5 col-lg-8 d-flex align-items-center justify-content-md-end mt-3 mt-md-0">
            <div class="dropdown">
                <button
                    class="btn btn-secondary dropdown-toggle"
                    type="button"
                    :class="{show: profileDropdown}"
                    @click="profileDropdown = !profileDropdown"
                >
                    Hello, {{ loggedInUser.first_name }}
                </button>
                <ul class="dropdown-menu" :class="{show: profileDropdown}">
                    <!-- <li><a class="dropdown-item" href="#">Settings</a></li>
                    <li><a class="dropdown-item" href="#">Messages</a></li> -->
                    <li><span role="button" class="dropdown-item" @click="logout">Uitloggen</span></li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import {logout, loggedInUser} from 'services/auth';
const profileDropdown = ref(false);
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
