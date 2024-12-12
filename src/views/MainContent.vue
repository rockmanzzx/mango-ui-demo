<template>
    <div id="main-container" class="main-container"
        :class="store.state.app.coolapse ? 'position-collapse-left' : 'position-left'">

        <div class="tab-container">
            <el-tabs class="tabs" :class="store.state.app.coolapse ? 'position-collapse-left' : 'position-left'"
                v-model="mainTabsActiveName" :closable="true" type="card" @tab-click="selectedTabHandle"
                @tab-remove="removeTabHandle">
                <el-dropdown class="tabs-tools" :show-timeout="0" trigger="hover">
                    <div style="font-size:20px;width:50px;">
                        <i class="el-icon-arrow-down"></i>
                    </div>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="tabsCloseCurrentHandle">
                            关闭当前标签
                        </el-dropdown-item>
                        <el-dropdown-item @click.native="tabsCloseOtherHandle">
                            关闭其他标签
                        </el-dropdown-item>
                        <el-dropdown-item @click.native="tabsCloseAllHandle">
                            关闭所有标签
                        </el-dropdown-item>
                        <el-dropdown-item @click.native="tabsRefreshCurrentHandle">
                            刷新当前标签
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <el-tab-pane v-for="item in mainTabs" :key="item.name" :label="item.title" :name="item.name">
                    <span slot="label">
                        <i :class="item.icon"></i>
                        {{ item.title }}
                    </span>
                </el-tab-pane>
            </el-tabs>
        </div>

        <div class="main-content">
            <router-view v-slot="{ Component }">
                <transition>
                    <component :is="Component" />
                </transition>
            </router-view>
        </div>

    </div>
</template>

<script setup>

import { computed, nextTick } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

const mainTabs = computed({
    get: () => store.state.app.mainTabs,
    set: (value) => store.commit('updateMainTabs', value)
});
const mainTabsActiveName = computed({
    get: () => store.state.app.mainTabsActiveName,
    set: (value) => store.commit('updateMainTabsActiveName', value)
});

const selectedTabHandle = tab => {
    tab = mainTabs.value.filter(item => item.name === tab.name)
    if (tab.length >= 1) {
        router.push({ name: tab[0].name })
    }
}
const removeTabHandle = tabName => {
    mainTabs.value = mainTabs.value.filter(item => item.name !== tabName)
    if (mainTabs.value.length >= 1) {
        if (tabName === mainTabsActiveName.value) {
            router.push({ 
                name: mainTabs.value[mainTabs.value.length - 1].name 
            }).then(() => {
                store.commit('updateMainTabsActiveName', router.currentRoute.value.name)
            })
        }
    } else {
        router.push('/')
    }
}
const tabsCloseCurrentHandle = () => {
    removeTabHandle(mainTabsActiveName.value)
}
const tabsCloseOtherHandle = () => {
    mainTabs.value = mainTabs.value.filter(item => item.name === mainTabsActiveName.value)
}
const tabsCloseAllHandle = () => {
    mainTabs.value = []
    router.push('/')
}
const tabsRefreshCurrentHandle = () => {
    const tempTabName = mainTabsActiveName.value
    removeTabHandle(tempTabName)
    nextTick(() => {
        router.push({ name: tempTabName })
    })
}


</script>

<style scoped lang="scss">
.main-container {
    padding: 0 5px 5px;
    position: absolute;
    top: 60px;
    left: 1px;
    right: 1px;
    bottom: 0px;

    // background: rgba(56, 5, 114, 0.5);
    .tabs {
        position: fixed;
        top: 60px;
        right: 50px;
        padding-left: 0px;
        padding-right: 2px;
        z-index: 1020;
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        background: rgb(255, 253, 255);
        border-color: rgba(200, 206, 206, 0.5);
        // border-left-width: 1px;
        // border-left-style: solid;
        border-bottom-width: 1px;
        border-bottom-style: solid;
    }

    .tabs-tools {
        position: fixed;
        top: 60px;
        right: 0;
        z-index: 1020;
        height: 40px;
        // padding: 0 10px;
        font-size: 14px;
        line-height: 40px;
        cursor: pointer;
        border-color: rgba(200, 206, 206, 0.5);
        border-left-width: 1px;
        border-left-style: solid;
        border-bottom-width: 1px;
        border-bottom-style: solid;
        background: rgba(255, 255, 255, 1);
    }

    .tabs-tools:hover {
        background: rgba(200, 206, 206, 1);
    }

    .main-content {
        position: absolute;
        top: 45px;
        left: 5px;
        right: 5px;
        bottom: 5px;
        padding: 5px;
        // background: rgba(209, 212, 212, 0.5);
    }
}

.position-left {
    left: 200px;
}

.position-collapse-left {
    left: 65px;
}
</style>