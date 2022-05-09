<template>
    <nav>
        <inertia-link :href="route('home')">Home</inertia-link>
    </nav>
    <h1 class="uppercase tracking-wide text-lg text-indigo-600 font-bold">Howdy</h1>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: "Home",
    setup() {
        //
    }
})
</script>

<style scoped>

</style>
