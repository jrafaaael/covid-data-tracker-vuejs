<template>
    <navbar></navbar>
    <router-view></router-view>
</template>

<script>
import Navbar from "@/components/Navbar";

export default {
    name: "App",
    components: {
        Navbar,
    },
};
</script>

<style></style>
