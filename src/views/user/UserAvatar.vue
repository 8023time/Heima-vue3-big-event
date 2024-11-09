<!-- 更换头像 -->
<script setup>
import PageContainer from '@/components/PageContainer.vue';
import { ref } from 'vue'
// import { ElMessage } from 'element-plus';
import { updatauserpicture } from '@/api/user';
import { Plus } from '@element-plus/icons-vue'
import { UseUserStore } from '@/stores';
import { ElMessage } from 'element-plus';

const user = UseUserStore()
const imageUrl = ref('')
const uploadRef = ref('')
imageUrl.value = user.user.user_pic

// 上传图片的函数
const updatapictureinformation = (picturefile) => {
  const reader = new FileReader()
  reader.readAsDataURL(picturefile.raw)
  reader.onload = () => {
    imageUrl.value = reader.result
  }
}
const onupdatapricture = async () => {
  try {
    await updatauserpicture(imageUrl.value);
    await user.getuserinfor();
    ElMessage.success('用户更新头像成功');
  } catch (error) {
    // 处理错误并显示错误信息
    ElMessage.error(error?.response?.data?.message || '头像上传失败');
    console.error('头像上传错误:', error);
  }
}
</script>

<template>
<PageContainer title="更换头像">
  <el-upload
    class="avatar-uploader"
    :auto-upload="false"
    :show-file-list="false"
    ref="uploadRef"
    :on-change="updatapictureinformation"
  >
    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
  </el-upload>
  <el-button size="large" type="primary" @click="uploadRef.$el.querySelector('input').click()">选择图片</el-button>
  <el-button size="large" type="success" @click="onupdatapricture">上传图片</el-button>
</PageContainer>
</template>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>