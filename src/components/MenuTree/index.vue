<template>
    <el-sub-menu v-if="menu.children && menu.children.length >= 1" :index="String(menu.id)">
        <template #title>
            <el-icon><component :is="menu.icon" /></el-icon>
            <span>{{ menu.name }}</span>
        </template>
        <MenuTree v-for="item in menu.children" :key="item.id" :menu="item" />
    </el-sub-menu>
    <el-menu-item v-else :index="String(menu.id)" @click="handleRoute(menu)">
        <el-icon><component :is="menu.icon" /></el-icon>
        <span>{{ menu.name }}</span>
    </el-menu-item>
</template>

<script setup>
import { defineOptions } from 'vue'
import { useRouter } from 'vue-router'

defineOptions({
    name: 'MenuTree'
})

const router = useRouter()

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

<style lang="scss" scoped></style>