<template>
    <div class="page">
        <h2>Home Page</h2>
        <li class="fa fa-home fa-lg"></li>
        <el-button type="primary" size="default" @click="testAxios()">测试Axios调用</el-button>
        <el-button type="primary" size="default" @click="getUser()">获取用户信息</el-button>
        <el-button type="primary" size="default" @click="getMenu()">获取菜单信息</el-button>
        <h3>{{ $t('common.doc') }}</h3>
        <el-button type="primary" size="default" @click="changeLanguage('zh')">中文</el-button>
        <el-button type="primary" size="default" @click="changeLanguage('en')">English</el-button>

    </div>
</template>

<script setup>

import axios from 'axios';
import '@/mock/index'
import { useI18n } from 'vue-i18n';

const { locale } = useI18n()

function testAxios() {
    axios.get('http://localhost:8080').then(res => {
        alert(res.data);
    });
}

function getUser() {
    axios.get('http://localhost:8080/user').then(res => {
        alert(JSON.stringify(res.data));
    });
}

function getMenu() {
    axios.get('http://localhost:8080/menu').then(res => {
        alert(JSON.stringify(res.data));
    });
}

function changeLanguage(lang) {
    localStorage.setItem('language', lang)
    locale.value = lang
}

</script>

<style lang="scss" scoped></style>