<template>
    <el-form :model="loginForm" :rules="filedRules" ref="loginFormRef" label-position="left" label-width="0px"
        class="demo-ruleForm login-container">
        <span class="tool-bar"></span>
        <h2 class="title" style="padding-left: 22px">系统登录</h2>
        <el-form-item prop="account">
            <el-input type="text" v-model="loginForm.account" autocomplete="off" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
            <el-input type="password" v-model="loginForm.password" autocomplete="off" placeholder="密码">
            </el-input>
        </el-form-item>
        <el-form-item>
            <el-col :span="12">
                <el-form-item prop="captcha">
                    <el-input type="test" v-model="loginForm.captcha" autocomplete="off" placeholder="验证码，点击图片刷新"
                        style="width: 100%">
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col class="line" :span="1">&nbsp;</el-col>
            <el-col :span="11">
                <el-form-item>
                    <img style="width: 100%" class="pointer" :src="loginForm.src" @click="refreshCaptcha">
                </el-form-item>
            </el-col>
        </el-form-item>
        <el-form-item style="width: 100%">
            <el-button type="primary" style="width:48%;" @click.prevent="reset">重 置</el-button>
            <el-button type="primary" style="width:48%;" @click.prevent="login">登 录</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup>
import { ref, reactive, onMounted, getCurrentInstance } from 'vue'
import Cookies from "js-cookie"
import axios from 'axios'

const { proxy } = getCurrentInstance()

const loading = ref(false)
const checked = ref(true)
const loginFormRef = ref(null)
const loginForm = reactive({
    account: 'admin',
    password: 'admin',
    captcha: '',
    src: ''
})
const filedRules = reactive({
    account: [
        { required: true, message: '请输入账号', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' }
    ]
})

function login() {
    loading.value = true
    let userInfo = {
        account: loginForm.account,
        password: loginForm.password,
        captcha: loginForm.captcha
    }
    console.log("userInfo: " + JSON.stringify(userInfo))
    // axios.post(proxy.$global.baseUrl + '/login', userInfo).then((res) => {
    //     console.log("res(then): " + JSON.stringify(res))
    //     if (res.data.msg != null) {
    //         // proxy.$message({
    //         //     message: res.data.msg,
    //         //     type: 'error'
    //         // })
    //     } else {
    //         Cookies.set('token', res.data.token)
    //         sessionStorage.setItem('user', userInfo.account)
    //         proxy.$router.push('/')
    //     }
    //     loading.value = false
    // }).catch((res) => {
    //     console.log("res(catch): " + res)
    //     loading.value = false
    // })

    proxy.$api.login.login(userInfo).then((res) => {
        console.log("res(then): " + res)
        if (res.msg != null) {
            // proxy.$message({
            //     message: res.msg,
            //     type: 'error'
            // })
        } else {
            Cookies.set('token', res.data.token)
            sessionStorage.setItem('user', userInfo.account)
            proxy.$router.push('/')
        }
        loading.value = false
    }).catch((res) => {
        console.log("res(catch): " + res)
        // proxy.$message({
        //     message: res.message,
        //     type: 'error'
        // })
        loading.value = false
    })
}

function refreshCaptcha() {
    loginForm.src = proxy.$global.baseUrl + '/captcha?t=' + new Date().getTime()
}

function reset() {
    if (loginFormRef.value) {
        loginFormRef.value.resetFields()
    }
}

onMounted(() => {
    refreshCaptcha()
})

</script>

<style lang="scss" scoped>
.login-container {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 100px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;

    .title {
        margin: 0px auto 30px auto;
        text-align: center;
        color: #505458;
    }
}
</style>
