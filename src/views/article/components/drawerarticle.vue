<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { ref } from 'vue'
// import { putarticlelistinformation } from '@/api/article'
import channelselect from './channelselect.vue'
import { getarticlelistinformation } from '@/api/article'
import { baseURL } from '@/utils/request'
import { putarticlelistinformation } from '@/api/article'
import { Plus } from '@element-plus/icons-vue'
import { QuillEditor } from '@vueup/vue-quill'
import { ElMessage } from 'element-plus'
import { changearticlelistinformation } from '@/api/article'
import axios from 'axios'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
// import type { UploadProps } from 'element-plus'
const ondrawerchange = ref(false)
const emit = defineEmits(['success'])
const imageUrl = ref()
const editorref = ref()
const formModel = ref({
    title:'',//标题
    cate_id:'',//分类的id
    content:'',//内容
    cover_img:'',//图片
    state:''//发布的状态
})
// 在这里可以查看传过来的值有没有id,如果没有id的话,就可以是添加一个文章的功能,如果有id的
// 时候,说明就是添加文章的功能,在这里可以看到
// 将网络图片地址转换为File对象
async function imageUrlToFile(url, fileName) {
  try {
    // 第一步：使用axios获取网络图片数据
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    const imageData = response.data;

    // 第二步：将图片数据转换为Blob对象
    const blob = new Blob([imageData], { type: response.headers['content-type'] });

    // 第三步：创建一个新的File对象
    const file = new File([blob], fileName, { type: blob.type });

    return file;
  } catch (error) {
    console.error('将图片转换为File对象时发生错误:', error);
    throw error;
  }
}

const open = async (row) => {
    if(row.id) {
        // 执行的就是这个编辑的操作
        ondrawerchange.value = true
        // 在这里就是要执行的就是这个对数据的回显操作
        const res = await getarticlelistinformation( row.id )
        formModel.value = res.data.data
        //下面的还要执行的操作就是对图片的一些操作
        imageUrl.value = baseURL + formModel.value.cover_img
        formModel.value.cover_img = await imageUrlToFile(imageUrl.value, formModel.value.cover_img)
    } else {
      ondrawerchange.value = true
        // 这里执行的就是添加文章的功能能
        formModel.value = {
            title:'',//标题
            cate_id:'',//分类的id
            content:'',//内容
            cover_img:'',//图片
            state:''//发布的状态
        }
        // h还要重置新的东西
        imageUrl.value = ''
        editorref.value.setHTML('')
    }
    console.log(row);
    
}
defineExpose({
    open// 在这里就可以实现的功能就是这个暴露的方法的功能
})
// 添加图片或者上传图片时会执行的函数
const addpicture = (data) => {
    imageUrl.value = URL.createObjectURL(data.raw) // 在这里可以得到一个url的地址,时这个图片的地址的`url
    formModel.value.cover_img = data.raw
    // console.log(data.raw);
}
const onpublish = async (data) => {
    //发布文章
    formModel.value.state = data
    // 转换 formData 数据
  const fd = new FormData()
  for (let key in formModel.value) {
    fd.append(key, formModel.value[key])
  }
  if (formModel.value.id) {
    console.log('编辑操作')
    await changearticlelistinformation(fd)
    ElMessage.success('编辑成功')
    ondrawerchange.value = false
    emit('success', 'edlit')
  } else {
    // 添加请求
    await putarticlelistinformation(fd)
    ElMessage.success('添加成功')
    ondrawerchange.value = false
    emit('success', 'add')
  }
}
</script>

<template>
    <el-drawer :title="formModel.cate_id?编辑文章:添加文章" v-model="ondrawerchange" size="40%">
      <!-- 发表文章表单 -->
        <el-form :model="formModel" ref="formRef" label-width="100px">
        <el-form-item label="文章标题" prop="title">
            <el-input v-model="formModel.title" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="文章分类" prop="cate_id" style="width: 240px;">
            <channelselect
            v-model="formModel.cate_id"
            width="100%"
            ></channelselect>
        </el-form-item>
        <el-form-item label="文章封面" prop="cover_img"> 
            <el-upload
                class="avatar-uploader"
                :auto-upload="false"
                :on-change="addpicture"
                :show-file-list="false"
                >
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
            </el-upload>
        </el-form-item>
        <el-form-item label="文章内容" prop="content">
            <div class="editor">
                <QuillEditor v-model="editorref" theme="snow" v-model:content="formModel.content" content-type="html"></QuillEditor>
            </div>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onpublish('已发布')">发布</el-button>
            <el-button type="info" @click="onpublish('草稿')">草稿</el-button>
        </el-form-item>
        </el-form>
    </el-drawer>

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

/* 下面的这个是富文本编辑器的一些样式 */
.editor{
    width: 100%;
    :deep(.ql-editor) {
    min-height: 300px;
  }
}
</style>