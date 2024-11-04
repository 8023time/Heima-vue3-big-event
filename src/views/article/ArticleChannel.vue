<!-- !-- 频道管理 --> 
<script setup>
// import { getarticlechannelinformation ,deletearticleinformation, changearticleinformation, addarticleinformation } from '@/api/article'
import { ref } from 'vue'
import { getarticlechannelinformation } from '@/api/article'
import { deletearticleinformation } from '@/api/article'
// import { Timer } from '@element-plus/icons-vue'
import {
  Delete,
  Edit  
} from '@element-plus/icons-vue'
import PageContainer from '@/components/PageContainer.vue'
import channelinformation from './components/channelinformation.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
// import { addarticleinformation } from '@/api/article'
// import { changearticleinformation } from '@/api/article'
// import { deletearticleinformation } from '@/api/article'

const articlechannelinformation = ref([])//用来存储这个文章分类的数据
const loading = ref(false)// 接下来的这个就是loading的效果,在加载的时候可以有loading的效果
const getarticlechannelinfor = async () => {
  loading.value = true; // 开始加载
  try {
    const res = await getarticlechannelinformation();
    articlechannelinformation.value = res.data.data || []; // 更新数据
  } catch (error) {
    console.error('获取频道信息失败:', error); // 打印错误
  } finally {
    loading.value = false; // 无论成功还是失败都结束加载
  }
}
getarticlechannelinfor()//这里的话就是直接请求后端数据

const handleEdit = async ( row ) => {// 在这里的这个是用来执行编辑操作的点击事件
  dialogVisible.value.onclickaddbutton(row)
}
const handleDelete = async ( row ) => {// 在这里是用来执行删除的点击事件的
  await ElMessageBox.confirm('你确认一定要删除这个分类吗?', "警告加上警告!", {
    confirmButtonText:'别管我!',
    cancelButtonText:'不删了~',
    type:'warning'
  })
  await deletearticleinformation(row.id)
  ElMessage.success('真棒,删除成功!')
  getarticlechannelinfor()
}
const onclickaddinformation = async () => {// 在这里的作用就是用来添加文章地信息的事件
  dialogVisible.value.onclickaddbutton({})
}
const onsuccesschange = () => {
  getarticlechannelinfor()//这里的话就是直接请求后端数据
}
//接下来的就是添加分类的这个方法等等
const dialogVisible = ref()
</script>

<template>
<Page-container title="文章分类">
  <template #extra>
    <el-button 
    @click="onclickaddinformation"
    plain
    size="large"
    type="success"
    >添加分类</el-button>
  </template>
    <el-table v-loading="loading" :data="articlechannelinformation" style="width: 100%">
      <el-table-column type="index" label="序号" width="100"></el-table-column>
      <el-table-column prop="cate_name" label="文章分类名称"></el-table-column>
      <el-table-column prop="cate_alias" label="文章分类别名"></el-table-column>
      <el-table-column label="操作" width="120">
        <template #default="scope">
          <el-button 
          size="large"  
          :icon="Edit" 
          type="primary"
          circle 
          plain 
          @click="handleEdit(scope.row)">
          </el-button>
          <el-button
            size="large"
            type="danger"
            :icon="Delete" 
            plain
            circle
            @click="handleDelete(scope.row)"
          > 
          </el-button>

          <!-- 在这里的话就是当这个数据,没有的情况下就是显示的就是这个一个losding的加载效果以及这个数据被小怪物吃了的效果图片 -->
      </template>
        </el-table-column>
        <template #empty>
          <el-empty description="数据都被小怪物给吃了"></el-empty>
      </template>

    </el-table>
    
</Page-container>

<channelinformation ref="dialogVisible" @success="onsuccesschange"></channelinformation>

</template>

<style scoped>

</style>

