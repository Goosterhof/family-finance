<template>
    <nav class="navbar navbar-light bg-light p-3">
        <div class="d-flex col-12 col-md-3 col-lg-2 mb-2 mb-lg-0 flex-wrap flex-md-nowrap justify-content-between">
            <a class="navbar-brand" href="#">Simple Dashboard</a>
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
            <input class="form-control form-control-dark" type="text" placeholder="Search" aria-label="Search" />
        </div>
        <div class="col-12 col-md-5 col-lg-8 d-flex align-items-center justify-content-md-end mt-3 mt-md-0">
            <div class="mr-3 mt-1">
                <span />
            </div>
            <div class="dropdown">
                <button
                    id="dropdownMenuButton"
                    class="btn btn-secondary dropdown-toggle"
                    type="button"
                    data-toggle="dropdown"
                    aria-expanded="false"
                >
                    Hello, John Doe
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <li><a class="dropdown-item" href="#">Settings</a></li>
                    <li><a class="dropdown-item" href="#">Messages</a></li>
                    <li><a class="dropdown-item" href="#">Sign out</a></li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
import {logout} from 'services/auth';

// import {logout} from '@script-development/vue-services';
// import {cvModule, emailModule, userModule, newUserModule, profileModule, companyModule} from '../modules';

const menu = [
    // {
    //     title: 'Klanten',
    //     children: [
    //         {name: 'Klanten', to: {name: 'companies.overview'}},
    //         // {name: 'Profielen', to: {name: profileModule.routeSettings.overview?.name}},
    //         // {name: 'E-mailadressen', to: {name: emailModule.routeSettings.overview?.name}},
    //     ],
    // },
    // {
    //     title: "Verzonden CV's",
    //     // children: [{name: "Verzonden CV's", to: {name: cvModule.routeSettings.overview?.name}}],
    // },
    // {
    //     title: 'Instellingen',
    //     // children: [
    //     //     {name: 'Gebruikers', to: {name: userModule.routeSettings.overview?.name}},
    //     //     {name: 'Uitnodigingen', to: {name: newUserModule.routeSettings.overview?.name}},
    //     // ],
    // },
];
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
