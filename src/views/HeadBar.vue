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
                <!-- 语言切换 -->
                <el-popover trigger="click" v-model="langVisible">
                    <div class="lang-item" @click="changeLanguage('zh')">简体中文</div>
                    <div class="lang-item" @click="changeLanguage('en')">English</div>
                    <template #reference>
                        <el-menu-item index="2" ref="langItemRef">
                            <li style="color: #fff;" class="fa fa-language fa-lg"></li>
                        </el-menu-item>
                    </template>
                </el-popover>
                <!-- 我的私信 -->
                <el-popover trigger="click" :show-arrow="false" placement="auto" width="300">
                    <message-panel></message-panel>
                    <template #reference>
                        <el-menu-item index="3">
                            <el-badge :value="5" :max="99" class="badge" type="error" :offset="[5, 15]">
                                <li style="color:#fff;" class="fa fa-envelope-o fa-lg"></li>
                            </el-badge>
                        </el-menu-item>
                    </template>
                </el-popover>
                <!-- 系统通知 -->
                <el-popover trigger="click" :show-arrow="false" placement="auto" width="250">
                    <notice-panel></notice-panel>
                    <template #reference>
                        <el-menu-item index="4">
                            <el-badge :value="4" :max="99" class="badge" type="error" :offset="[5, 15]">
                                <li style="color:#fff;" class="fa fa-bell-o fa-lg"></li>
                            </el-badge>
                        </el-menu-item>
                    </template>
                </el-popover>
                <!-- 用户信息 -->
                <el-popover trigger="click" :show-arrow="false" placement="auto" width="280">
                    <personal-panel :user="user"></personal-panel>
                    <template #reference>
                        <el-menu-item index="5">
                            <span class="user-info">
                                <img :src=user.avatar alt="">{{ user.name }}
                            </span>
                        </el-menu-item>
                    </template>
                </el-popover>
            </el-menu>
        </span>
    </div>
</template>

<script setup>
import { computed, getCurrentInstance, onMounted, ref } from "vue";
import userAvatar from '@/assets/user.png'
import { mapState, useStore } from "vuex";

import Hamburger from '@/components/Hamburger/index.vue'
import ThemePicker from '@/components/ThemePicker/index.vue'

import PersonalPanel from '@/views/Core/PersonalPanel.vue';
import NoticePanel from "./Core/NoticePanel.vue";
import MessagePanel from "./Core/MessagePanel.vue"

const { proxy } = getCurrentInstance();

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

function changeLanguage(lang) {
    lang === '' ? 'zh' : lang;
    proxy.$i18n.locale = lang;
    localStorage.setItem("language", lang);
    langVisible.value = false;
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