<template>
    <div id="main-container" class="main-container" :class="'position-left'">
        <div class="tab-contain"></div>
        <div class="main-content">
            <router-view v-slot="{ Component }">
                <transition name="fade" mode="out-in">
                    <component :is="Component" />
                </transition>
            </router-view>
        </div>

    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.main-container {
    padding: 0 5px 5px;
    position: absolute;
    top: 60px;
    left: 1px;
    right: 1px;
    bottom: 0px;
    background: rgba(67, 69, 70, 0.1);

    .main-content {
        position: absolute;
        top: 45px;
        left: 5px;
        right: 5px;
        bottom: 5px;
        padding: 5px;
    }

    .position-left {
        left: 200px;
    }
}
</style>