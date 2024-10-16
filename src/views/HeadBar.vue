<template>
    <div class="headbar" :style="{ 'background': themeColor }"
        :class="collapse ? 'position-collapse-left' : 'position-left'">
        <!-- 导航收缩 -->
        <span class="hamburg">
            <el-menu class="el-menu-demo" background-color="themeColor" text-color="#fff" active-text-color="themeColor"
                mode="horizontal" :ellipsis=false>
                <el-menu-item index="1" @click="onCollapse">
                    <hamburger :isActive="collapse"></hamburger>
                </el-menu-item>
            </el-menu>
        </span>
        <!-- 导航菜单 -->
        <span class="navbar">
            <el-menu :default-active="activeIndex" class="el-menu-demo" :background-color="themeColor" text-color="#fff"
                active-text-color="#ffd04b" mode="horizontal" @select="selecteNavBar" :ellipsis=false>
                <el-menu-item index="1" @click="$router.push('/')">{{ $t("common.home") }}</el-menu-item>
                <el-menu-item index="2" @click="openWindow('https://gitee.com/liuge1988/kitty/wikis/Home')">{{
                    $t("common.doc") }}</el-menu-item>
                <el-menu-item index="3" @click="openWindow('https://www.cnblogs.com/xifengxiaoma/')">{{
                    $t("common.blog") }}</el-menu-item>
            </el-menu>
        </span>
        <!-- 工具栏 -->
        <span class="toolbar">
            <el-menu class="el-menu-demo" background-color="themeColor" text-color="#14889A"
                active-text-color="themeColor" mode="horizontal" :ellipsis=false>
                <!-- 主题切换 -->
                <el-menu-item index="1">
                    <theme-picker class="theme-picker" :default="themeColor" @onThemeChange="onThemeChange">
                    </theme-picker>
                </el-menu-item>
                <!-- 用户信息 -->
                <el-menu-item index="2">
                    <span class="user-info">
                        <img :src=user.avatar alt="">{{ user.name }}
                    </span>
                </el-menu-item>
            </el-menu>
        </span>
    </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import userAvatar from '@/assets/user.png'
import { mapState, useStore } from "vuex";
import Hamburger from '@/components/Hamburger/index.vue'
import ThemePicker from '@/components/ThemePicker/index.vue'

const user = ref({
    name: "Louis",
    avatar: "",
    role: "超级管理员",
    registeInfo: "注册时间：2018-12-20"
});
const activeIndex = ref("1");
const langVisible = ref(false);

const store = useStore();
const collapse = computed(() => store.state.app.collapse);
const themeColor = computed(() => store.state.app.themeColor);

function openWindow(url) {
    window.open(url);
}

function selecteNavBar(key, keyPath) {
    console.log(key, keyPath);
}

function onCollapse() {
    store.commit('onCollapse');
}

function onThemeChange(themeColor) {
    store.commit('setThemeColor', themeColor);
}

onMounted(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
        user.value.name = storedUser;
        user.value.avatar = userAvatar;
    }
})


</script>

<style lang="scss" scoped>
.headbar {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 1030;
    height: 60px;
    line-height: 60px;
    border-color: rgba(180, 190, 190, 0.8);
    border-left-width: 1px;
    border-left-style: solid;
}

.hamburg {
    float: left;
}

.navbar {
    float: left;
}

.toolbar {
    float: right;
}

.user-info {
    font-size: 20px;
    color: #fff;
    cursor: pointer;

    img {
        width: 40px;
        height: 40px;
        border-radius: 10px;
        margin: 10px 0px 10px 10px;
        float: right;
    }
}

.position-left {
    left: 200px;
}

.position-collapse-left {
    left: 65px;
}
</style>