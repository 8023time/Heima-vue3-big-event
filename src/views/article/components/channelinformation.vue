<!-- eslint-disable vue/multi-word-component-names -->
<!-- 小插件 -->
<script setup>
import { ref } from 'vue'
import { changearticleinformation } from '@/api/article' //修改文章分类
import { addarticleinformation } from '@/api/article' // 添加文章分类
import { ElMessage } from 'element-plus'
// import { getarticlechannelinformation ,deletearticleinformation, changearticleinformation, addarticleinformation } from '@/api/article'

const dialogVisible = ref(false)
const refdatas = ref()
const formtable = ref({
    cate_name:'',
    cate_alias:''
})
const formrules =ref({
    cate_name:[
    { required: true, message: '请输入文章分类名称', trigger: 'blur' },
    { pattern: /^\S{1,10}$/, message: '分类名必须是1-10位的非空字符', trigger: 'blur' },//值得注意的是,我在文档上面没有找到这个pattern的这个rules,在这里的话就需要记忆一下了!!!
    ],
    cate_alias:[
    { required: true, message: '请输入文章分类别名', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9]{1,15}$/, message: '分类名必须为1-15位的字母或者数字', trigger: 'blur' },
    ]
})

const onclickaddbutton = (obj) => {
    dialogVisible.value = true
    formtable.value = { ...obj }
}
//接下来还要暴露出来这个小组件的一些方法用来传输数据渲染表单的一些数据
defineExpose({
    onclickaddbutton
})
 // 接下来的就是提交确认的按钮
 const onsubmit = async (refdatas) => {
    await refdatas.value.validate()
    const iselite = refdatas.value.id
    if(iselite) { // 说明地就是这个是修改文章分类地request地请求
      await changearticleinformation(refdatas.value)
      ElMessage({
        message: '文章修改成功!',
        type: 'success',
        plain: true,
      })
    } else { // 在这里地话就是指的就是这个添加文章分类地request地请求地一个写法了
      await addarticleinformation(refdatas.value)
      ElMessage({
      message: '文章添加成功!',
      type: 'success',
      plain: true,
    })
    }
 }

</script>

<!-- 添加分类 -->
<template>
    <el-dialog
    v-model="dialogVisible"
    :title="formtable.id ? '编辑分类' : '添加分类'"
    width="500"
  >
  <!-- 在下面的这里的代码就是写的是表单的数据,包括的有增加文章分类还有修改文章分类的两个部分的内容,都写在了这里面的代码里面 -->
    <el-form :model="formtable" ref="refdatas" :rules="formrules" abel-width="100px" style="padding-right: 30px"> 
        <el-form-item label="文章分类名称:" prop="cate_name">
            <el-input v-model="formtable.cate_name" placeholder="请输入文章分类名称"></el-input>
        </el-form-item>
        <el-form-item label="文章分类别名:" prop="cate_alias">
            <el-input v-model="formtable.cate_alias" placeholder="请输入文章分类别名"></el-input>
        </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="onsubmit(refdatas)">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
