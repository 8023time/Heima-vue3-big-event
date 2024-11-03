<script setup>
import { User, Lock } from '@element-plus/icons-vue'
// import { rules } from 'eslint-plugin-vue'
import { ref } from 'vue'
import {userregisterservice} from '@/api/user'
import { userloginservice } from '@/api/user'
import { ElMessage } from 'element-plus'
import { watch } from 'vue'
import router from '@/router'
import { UseUserStore } from '@/stores/index'
const isRegister = ref(true)
const form = ref()//这个响应是数据是用来记录的是表单的数据
const userstore = UseUserStore()

//表单的一些响应式的数据存储在一个对象里面,还有一些的就是这个数据的规则校验
const formnumber = ref({ //这个就是存储这个表单的数据的对象
  username:'',
  password:'',
  repassword:''
})
const formrules = {
  username:[
  { required: true, message: '请输入用户名', trigger: 'change' },
  { min: 4, max: 8, message: '用户名必须为4-8为字符', trigger: 'change' },
  ],
  password:[
  { required: true, message: '请输入你的密码', trigger: 'change' },
  { min: 8, max: 12, message: '密码必须为8-12位字符', trigger: 'change' },
  ],
  repassword:[
  { required: true, message: '请再次输入你的密码', trigger: 'change' },
  { min: 8, max: 12, message: '密码必须为8-12位字符', trigger: 'change' },
  { validator: (rule , value, callback) => {// 自定义校验规则
      if(value === ''){
        callback(new Error('请再次输入密码'))
      }else if (value !== formnumber.value.password){
        callback(new Error('两次输入的密码不一致'))
      } else {
        callback()//这里无论是否校验成功与否都要返回的一个callback()
      }
    }, trigger: 'change' },
  ]
}
//接下来的就是点击注册的时候会执行的一些步骤
const userregister = async () => {
    await form.value.validate();
    await userregisterservice(formnumber.value); // 确保传递的是 formnumber，而不是 form
    ElMessage.success('注册成功!!!');
    isRegister.value = false;
};
//接下来的就是登录的代码环节
const userlogin = async () => {
  await form.value.validate();
  let res = await userloginservice(formnumber.value); 
  userstore.settoken(res.data.token)//在这里可以存token值
  ElMessage.success('登录成功!!!');
  router.push('/')
}
watch(isRegister,() => {
  formnumber.value={
    username:'',
    password:'',
    repassword:''
  }
})
</script>

<template>
  <el-row class="login-page">
    <el-col :span="12" class="bg"></el-col>
    <el-col :span="6" :offset="3" class="form">
      <!-- 注册页面 -->
      <el-form :model="formnumber" :rules="formrules" ref="form" size="large" autocomplete="off" v-if="isRegister">
        <el-form-item>
          <h1>注册</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input :prefix-icon="User" v-model="formnumber.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            :prefix-icon="Lock"
            type="password"
            v-model="formnumber.password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="repassword">
          <el-input
            :prefix-icon="Lock"
            v-model="formnumber.repassword"
            type="password"
            placeholder="请输入再次密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="userregister" class="button" type="primary" auto-insert-space>
            注册
          </el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = false">
            ← 返回
          </el-link>
        </el-form-item>
      </el-form>
      <!-- 登录页面 -->
      <el-form :model="formnumber" :rules="formrules" ref="form" size="large" autocomplete="off" v-else>
        <el-form-item>
          <h1>登录</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input v-model="formnumber.username" :prefix-icon="User" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            name="password"
            v-model="formnumber.password"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item class="flex">
          <div class="flex">
            <el-checkbox>记住我</el-checkbox>
            <el-link type="primary" :underline="false">忘记密码？</el-link>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button @click="userlogin" class="button" type="primary" auto-insert-space
            >登录</el-button
          >
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = true">
            注册 →
          </el-link>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.login-page {
  height: 100vh;
  background-color: #fff;
  .bg {
    background: url('@/assets/logo2.png') no-repeat 60% center / 240px auto,
      url('@/assets/login_bg.jpg') no-repeat center / cover;
    border-radius: 0 20px 20px 0;
  }
  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;
    .title {
      margin: 0 auto;
    }
    .button {
      width: 100%;
    }
    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>