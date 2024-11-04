<!-- 文章管理 -->
<script setup>
import PageContainer from '@/components/PageContainer.vue'
import channelselect from './components/channelselect.vue'
// import { Delete } from '@element-plus/icons-vue/dist/types';
// import { Edit } from '@element-plus/icons-vue/dist/types';
import { ref } from 'vue'
import {
  Delete,
  Edit
} from '@element-plus/icons-vue'
const articledatamessage = ref([
{
    id: 5961,
    title: '新的文章啊',
    pub_date: '2022-07-10 14:53:52.604',
    state: '已发布',
    cate_name: '体育'
  },
  {
    id: 5962,
    title: '这个不是新的文章啊',
    pub_date: '2022-07-10 14:54:30.904',
    state: "未发布",
    cate_name: '体育'
  }
  ])
  // 下面的就是一些方法的定义
  const onchangedata = (datamessage) => {
    console.log(datamessage);
    
  }
  const ondeletedata = (datamessage) => {
    console.log(datamessage);
    
  } 
</script>

<template>

  <Page-container title="文章分类">
    <template #extra>
      <el-button>这里可以添加一些按钮或者的话就是一些数据到这里来</el-button>
    </template>
    <!-- 在这里的是顶部的展示的区域 -->
    <el-form inline>
      <channelselect></channelselect>
      <el-form-item label="发布状态" style="width: 240px;">
        <el-select>
          <el-option>已发布</el-option>
          <el-option>草稿</el-option>
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