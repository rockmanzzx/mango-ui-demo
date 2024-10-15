<template>
    <div class="headbar" :class="collapse ? 'position-collapse-left' : 'position-left'">
        <!-- 导航收缩 -->
        <span class="hamburg">
            <el-menu class="el-menu-demo" background-color="#14889A" text-color="#fff" active-text-color="#14889A"
                mode="horizontal">
                <el-menu-item index="1" @click="onCollapse">
                    <hamburger :isActive="collapse"></hamburger>
                </el-menu-item>
            </el-menu>
        </span>
        <!-- 工具栏 -->
        <span class="toolbar">
            <el-menu class="el-menu-demo" background-color="#14889A" text-color="#14889A" active-text-color="white" mode="horizontal" :default-active="activeIndex" @select="selecteNavBar">
                <el-menu-item index="1">
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

const user = ref({
    name: "Louis",
    avatar: "user.png",
    role: "超级管理员",
    registeInfo: "注册时间：2018-12-20"
});
const activeIndex = ref("1");
const langVisible = ref(false);

const store = useStore();
const collapse = computed(() => store.state.app.collapse);

function selecteNavBar(key, keyPath) {
    console.log(key, keyPath);
}

function onCollapse() {
    store.commit('onCollapse');
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
    background: #14889a;
}

.hamburg,
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