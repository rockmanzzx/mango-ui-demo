<template>
    <div class="personal-panel">
        <div class="personal-desc" :style="{'background':proxy.$store.state.app.themeColor}">
            <div class="avatar-container">
                <img :src=user.avatar alt="" class="avatar">
            </div>
            <div class="name-role">
                <span class="sender">{{ user.name }} - {{ user.role }}</span>
            </div>
            <div class="registe-info">
                <span class="registe-info">
                    <li class="fa fa-clock-o"></li>
                    {{ user.registeInfo }}
                </span>
            </div>
        </div>
        <div class="personal-relation">
            <span class="relation-item">followers</span>
            <span class="relation-item">watchers</span>
            <span class="relation-item">friends</span>
        </div>
        <div class="main-operation">
            <span class="main-operation-item">
                <el-button size="small" class="fa fa-male">个人中心</el-button>
            </span>
            <span class="main-operation-item">
                <el-button size="small" class="fa fa-key">修改密码</el-button>
            </span>
        </div>
        <div class="other-operation">
            <div class="other-operation-item">
                <li class="fa fa-eraser"></li>
                清除缓存
            </div>
            <div class="other-operation-item">
                <li class="fa fa-user"></li>
                在线人数
            </div>
            <div class="other-operation-item">
                <li class="fa fa-bell"></li>
                访问次数
            </div>
            <div class="other-operation-item">
                <li class="fa fa-undo"></li>
                {{ $t("common.backupRestore") }}
            </div>
        </div>
        <div class="personal-footer" @click="logout">
            <li class="fa fa-sign-out"></li>
            {{ $t("common.logout") }}
        </div>
    </div>
</template>

<script setup>

import { ElMessageBox } from 'element-plus'
import { getCurrentInstance } from 'vue'

import avatar from '@/assets/user.png'

const props = defineProps({
    user: {
        type: Object,
        default: {
            name: "admin",
            avatar: avatar,
            role: "SuperAdmin",
            registeInfo: "2024-10-22"
        }
    }
})

const { proxy } = getCurrentInstance()

function logout() {
    ElMessageBox.confirm(
        '确认退出吗？',
        '提示',
        {
            type: 'warning'
        }
    )
    .then(() => {
        sessionStorage.removeItem('user')
        proxy.$router.push('/login')
        proxy.$api.login.logout().then(() => {
            proxy.$message({
                message: '退出成功',
                type: 'success'
            })
        }).catch(() => {
            proxy.$message({
                message: '退出失败',
                type: 'error'
            })
        })
    })
    .catch(() => {})
}

</script>

<style lang="scss" scoped>
.personal-panel {
    font-size: 14px;
    width: 280px;
    text-align: center;
    border: rgba(180, 190, 190, 0.2) 1px solid;
    background: rgba(182, 172, 172, 0.1);
    margin: -14px;
}
.personal-desc {
    padding: 15px;
    color: white;
}
.avatar {
    width: 80px;
    height: 80px;
    border-radius: 40px;
}
.name-role {
    font-size: 16px;
    padding: 5px;
}
.personal-relation {
    font-size: 16px;
    padding: 12px;
    margin-right: 1px;
}
.relation-item {
    padding: 12px;
}
.relation-item:hover {
    cursor: pointer;
    color: rgb(19, 138, 156);
}
.main-operation {
    padding: 8px;
    margin-right: 1px;
    border: rgba(201, 206, 206, 0.2) 1px solid;
}
.main-operation-item {
    margin: 15px;
}
.other-operation {
    padding: 15px;
    margin-right: 1px;
    text-align: left;
    border: rgba(180, 190, 190, 0.2) 1px solid;
}
.other-operation-item {
    padding: 12px;
}
.other-operation-item:hover {
    cursor: pointer;
    background: #9e94941e;
    color: rgb(19, 138, 156);
}
.personal-footer {
    margin-right: 1px;
    font-size: 14px;
    text-align: center;
    padding-top: 10px;
    padding-bottom: 10px;
    border: rgba(180, 190, 190, 0.2) 1px solid;
}
.personal-footer:hover {
    cursor: pointer;
    color: rgb(19, 138, 156);
    background: #b1a6a61e;
}
</style>