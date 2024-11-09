<script setup>
import PageContainer from '@/components/PageContainer.vue';
// import { UseUserStore } from '@/stores/index';
import { getpersonaluserinformation, personaluserinformation } from '@/api/user';
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';

// const userstore = UseUserStore();
// userstore.user = userInfo.value
const formRef = ref();
const userInfo = ref({
  username: '',
  nickname: '',
  email: '',
  id: ''
});

const getuser = async () => {
  try {
    const app = await getpersonaluserinformation();
    userInfo.value = app.data.data;
  } catch {
    ElMessage.error('获取用户信息失败');
  }
};

const onsubmitdata = async () => {
  try {
    const valid = await formRef.value.validate();
    if (valid) {
      await personaluserinformation(userInfo.value);
      ElMessage.success('修改成功');
    }
  } catch {
    ElMessage.error('修改失败');
  }
};

onMounted(() => {
  getuser();
});

const rules = {
  nickname: [
    { required: true, message: '请输入用户昵称', trigger: 'blur' },
    {
      pattern: /^\S{2,10}$/,
      message: '昵称必须是2-10位的非空字符串',
      trigger: 'blur'
    }
  ],
  email: [
    { required: true, message: '请输入用户邮箱', trigger: 'blur' },
    { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
  ]
};
</script>

<template>
  <PageContainer title="基本资料">
    <el-row>
      <el-col :span="12">
        <el-form
          :model="userInfo"
          :rules="rules"
          ref="formRef"
          label-width="100px"
          size="large"
        >
          <el-form-item label="登录名称">
            <el-input v-model="userInfo.username" disabled></el-input>
          </el-form-item>
          <el-form-item label="用户昵称" prop="nickname">
            <el-input v-model="userInfo.nickname"></el-input>
          </el-form-item>
          <el-form-item label="用户邮箱" prop="email">
            <el-input v-model="userInfo.email"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onsubmitdata">提交修改</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </PageContainer>
</template>

<style>
</style>
