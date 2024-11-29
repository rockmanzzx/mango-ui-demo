<template>
    <el-submenu v-if="menu.children && menu.children.length >= 1" :index="'' + menu.id">
        <template slot="title">
            <i class="menu.icon"></i>
            <span slot="title">{{ menu.name }}</span>
        </template>
        <MenuTree v-for="item in menu.children" key="item.id" :menu="item"></MenuTree>
    </el-submenu>
    <el-menu-item v-else :index="'' + menu.id" @click="handleRoute(menu)">
        <i :class="menu.icon"></i>
        <span slot="title">{{ menu.name }}</span>
    </el-menu-item>
</template>

<script setup>
import router from '@/router';

const props = defineProps({
    menu: {
        type: Object,
        required: true
    }
})

function handleRoute(menu) {
    router.push('/' + menu.url)
}
</script>

<style lang="scss" scoped>

</style>