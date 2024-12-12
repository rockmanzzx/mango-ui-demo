<template>
  <div id="app">
    <!-- <home></home> -->
    <router-view></router-view>
    <!-- <personal-panel></personal-panel> -->
    <!-- <notice-panel></notice-panel> -->
    <!-- <message-panel></message-panel> -->
    <!-- <PopupTreeInput></PopupTreeInput> -->
    <!-- <KtTable></KtTable> -->
  </div>
</template>

<script setup>
import PersonalPanel from '@/views/Core/PersonalPanel.vue';
import NoticePanel from './views/Core/NoticePanel.vue';
import MessagePanel from './views/Core/MessagePanel.vue';
import PopupTreeInput from './components/PopupTreeInput/index.vue';
import KtTable from '@/views/Core/KtTable.vue';
import Home from '@/views/Home.vue';
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
