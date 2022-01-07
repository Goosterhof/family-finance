<template>
    <nav id="navbar" class="navbar p-md-0 flex-md-column navbar-dark bg-dark navbar-expand-md">
        navtest
        <router-link :to="{name: 'Home'}" class="navbar-brand">
            <h1 class="mt-0 mt-md-3">Ffind</h1>
        </router-link>
        <div id="nav-collapse" class="navbar-collapse collapse" style="display: none">
            <ul class="nav w-100 flex-column">
                <template v-for="menuItem in menu" :key="menuItem.title">
                    <li class="navbar-text">{{ menuItem.title }}</li>
                    <li v-for="child in menuItem.children" :key="child.name" class="nav-item">
                        <router-link class="nav-link" :to="child.to">{{ child.name }}</router-link>
                    </li>
                </template>
                <li class="nav-item logout">
                    <!-- @click="logout" -->
                    <a href="#" target="_self" class="nav-link">
                        <FontAwesomeIcon :icon="faSignOut" />
                        Uitloggen
                    </a>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script setup>
// import {logout} from '@script-development/vue-services';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import {faSignOut} from '@fortawesome/pro-solid-svg-icons';
// import {cvModule, emailModule, userModule, newUserModule, profileModule, companyModule} from '../modules';

const menu = [
    {
        title: 'Klanten',
        children: [
            {name: 'Klanten', to: {name: 'companies.overview'}},
            // {name: 'Profielen', to: {name: profileModule.routeSettings.overview?.name}},
            // {name: 'E-mailadressen', to: {name: emailModule.routeSettings.overview?.name}},
        ],
    },
    {
        title: "Verzonden CV's",
        // children: [{name: "Verzonden CV's", to: {name: cvModule.routeSettings.overview?.name}}],
    },
    {
        title: 'Instellingen',
        // children: [
        //     {name: 'Gebruikers', to: {name: userModule.routeSettings.overview?.name}},
        //     {name: 'Uitnodigingen', to: {name: newUserModule.routeSettings.overview?.name}},
        // ],
    },
];
</script>
