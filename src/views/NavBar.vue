<template>
    <div class="menu-bar-container">
        <div class="logo" :class="'menu-bar-width'" @click="$router.push('/login')">
            <img src="@/assets/logo.png" alt="">
            <div>Mango</div>
        </div>
    </div>
</template>

<script setup>
import { useStore } from 'vuex';

const store = useStore()

const appName = computed(() => {
    store.state.app.appName
})
const themeColor = computed(() => {
    store.state.app.themeColor
})
const collapse = computed(() => {
    store.state.app.collapse
})
const navTree = computed(() => {
    store.state.menu.navTree
})
</script>

<style lang="scss" scoped>
.menu-bar-container {
    position: fixed;
    top: 0px;
    left: 0px;
    bottom: 0px;
    z-index: 1020;

    .logo {
        position: absolute;
        top: 0px;
        height: 60px;
        line-height: 60px;
        background: #535c64;
        cursor: pointer;

        img {
            width: 40px;
            height: 40px;
            border-radius: 0px;
            margin: 10px 10px 10px 10px;
            float: left;
        }

        div {
            font-size: 25px;
            color: white;
            text-align: left;
            padding-left: 20px;
        }
    }

    .menu-bar-width {
        width: 200px;
    }
}
</style>