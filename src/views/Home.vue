<template>
    <div class="container">
        <nav-bar></nav-bar>
        <head-bar></head-bar>
        <main-content></main-content>
    </div>
</template>

<script setup>
import HeadBar from "./HeadBar.vue";
import NavBar from "./NavBar.vue";
import MainContent from "./MainContent.vue";
</script>

<style lang="scss" scoped>
.container {
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
}
</style>