<template>
    <div class="menu-bar-container">
        <div class="logo" :style="{ 'background': themeColor }"
            :class="collapse ? 'menu-bar-collapse-width' : 'menu-bar-width'" @click="$router.push('/')">
            <img v-if="collapse" src="@/assets/logo.png" alt="">
            <div>{{ collapse ? '' : appName }}</div>
        </div>

        <el-menu ref="navMenu" default-active="1" :class="collapse ? 'menu-bar-collapse-width' : 'menu-bar-width'"
            :collapse="collapse" :collapse-transition="false" :unique-opened="true" @open="handleOpen"
            @close="handleClose" @select="handleSelect">
            <menu-tree v-for="item in navTree" :key="item.id" :menu="item"></menu-tree>
        </el-menu>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

import MenuTree from '@/components/MenuTree/index.vue'

const store = useStore()

const appName = computed(() =>
    store.state.app.appName
)
const themeColor = computed(() =>
    store.state.app.themeColor
)
const collapse = computed(() =>
    store.state.app.collapse
)
const navTree = computed(() =>
    store.state.menu.navTree
)

const handleOpen = () => {
    console.log('handleOpen')
}
const handleClose = () => {
    console.log('handleClose')
}
const handleSelect = (a, b) => {
    console.log('handleSelect')
}
</script>

<style lang="scss" scoped>
.menu-bar-container {
    position: fixed;
    top: 0px;
    left: 0px;
    bottom: 0px;
    z-index: 1020;

    .el-menu {
        position: absolute;
        top: 60px;
        bottom: 0px;
        text-align: left;
    }

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

    .menu-bar-collapse-width {
        width: 65px;
    }
}
</style>