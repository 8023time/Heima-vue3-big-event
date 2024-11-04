<!-- 文章管理 -->
<script setup>
import PageContainer from '@/components/PageContainer.vue'
import channelselect from './components/channelselect.vue'
import { getarticlelist } from '@/api/article'
import { settime } from '@/utils/setdate'
import { ref } from 'vue'
import {
  Delete,
  Edit
} from '@element-plus/icons-vue'
const articledatamessage = ref([]) // 在这里记录的就是文章的一些information
const tatalarticleinformation = ref(0) //这里记录的就是文章的总条数
const articlerootref = ref({
    pagenum: 1,  // 这个是当前的页面
    pagesize: 5, // 这个是当前页面有的最多的条数
    cate_id:'',
    state:''
  })

  // 下面的就是一些方法的定义
  const onchangedata = (datamessage) => {
    console.log(datamessage);
  }
  const ondeletedata = (datamessage) => {
    console.log(datamessage);
    
  } 
  //接下来又是一些新的东西,就是这个定义一个用来收集一些数据的ref响应式地数据地值保存到一个新的ref地响应式地东西里
const getinformation = async () => {
  const res = await getarticlelist(articlerootref.value)
  articledatamessage.value = res.data.data
  tatalarticleinformation.value = res.data.total
}
getinformation()
</script>

<template>

  <Page-container title="文章分类">
    <template #extra>
      <el-button>这里可以添加一些按钮或者的话就是一些数据到这里来</el-button>
    </template>
    <!-- 在这里的是顶部的展示的区域 -->
    <el-form inline>
      <channelselect v-model="articledatamessage.cate_id"></channelselect>
      <el-form-item label="发布状态" style="width: 240px;">
        <el-select v-model="articledatamessage.state">
          <el-option label="已发布" value="已发布">已发布</el-option>
          <el-option label="草稿" value="草稿">草稿</el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">搜索</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 在下面的这里就是用来存储相关数据的地方 -->
    <el-table :data="articledatamessage" style="width: 100%;">
      <!-- 在这里也是用到的是插槽 -->
      <el-table-column label="文章标题">
        <template #default="{row}">
          <el-link type="peimary" :underline="false">{{ row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="分类" prop="cate_name">

      </el-table-column>
      <el-table-column label="发表时间" prop="pub_date">
        <template #default="{ row }">
          {{ settime( row.pub_date ) }}
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="state">

      </el-table-column>
      <!-- 在这里的话就用到的就是插槽 -->
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button type="primary" circle :icon="Edit" @click="onchangedata(row)"></el-button>
          <el-button type="danger" circle :icon="Delete" @click="ondeletedata(row)"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <template #empty>
      <el-empty description="没有没有数据"></el-empty>
    </template>

  </Page-container>
  
  </template>

<style scoped>

</style>