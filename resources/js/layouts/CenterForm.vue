<template>
    <div class="container d-flex align-items-center justify-content-center">
        <div>
            <h1>Family Finance</h1>
            <p>Begin hier aan je financiele avontuur</p>
            <form action="">
                <slot />
            </form>
        </div>
    </div>
</template>

<style scoped>
.container {
    height: 100vh;
}
</style>
