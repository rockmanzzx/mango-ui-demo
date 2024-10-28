<script setup>
import PersonalPanel from '@/views/Core/PersonalPanel.vue';
import NoticePanel from './views/Core/NoticePanel.vue';
import MessagePanel from './views/Core/MessagePanel.vue';
</script>

<template>
  <div id="app">
    <!-- <router-view></router-view> -->
    <!-- <personal-panel></personal-panel> -->
    <!-- <notice-panel></notice-panel> -->
    <message-panel></message-panel>
  </div>
</template>

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
