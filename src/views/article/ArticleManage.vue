<!-- 文章管理 -->
<script setup>
import PageContainer from '@/components/PageContainer.vue'
import channelselect from './components/channelselect.vue'
import drawerarticle from './components/drawerarticle.vue'
import { deletearticlelistinformation } from '@/api/article'
import { getarticlelist } from '@/api/article'
import { settime } from '@/utils/setdate'
import { ref } from 'vue'
import {
  Delete,
  Edit
} from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
const loading = ref(false)
const drawerdata = ref()
const articledatamessage = ref([]) // 在这里记录的就是文章的一些information
const tatalarticleinformation = ref(0) //这里记录的就是文章的总条数
const articlerootref = ref({
    pagenum: 1,  // 这个是当前的页面
    pagesize: 5, // 这个是当前页面有的最多的条数
    cate_id:'',
    state:''
  })

  // 下面的就是一些方法的定义
  const onchangedata = (datamessage) => { // 这个就是编辑文章的操作的按钮

    drawerdata.value.open(datamessage)
    console.log(datamessage);
  }
  const ondeletedata = async (row) => { //这里就是删除文章的地方
    await deletearticlelistinformation(row.id)
    ElMessage.success('删除成功!')
    getinformation() // 删除成功后还要进行对数据的重新渲染
  } 
  //接下来又是一些新的东西,就是这个定义一个用来收集一些数据的ref响应式地数据地值保存到一个新的ref地响应式地东西里
const getinformation = async () => {
  loading.value = true
  const res = await getarticlelist(articlerootref.value)
  articledatamessage.value = res.data.data
  tatalarticleinformation.value = res.data.total
  loading.value = false
}
getinformation()

// 下面定义的就是这个表格下面的分页的设计的部分
const onSizeChange = (size) => { // 这个设置的是一页又多少条数据
  // console.log(size,'我是size');
  articledatamessage.value.pagesize = 1
  articledatamessage.value.pagesize = size
  getinformation()
}
const onCurrentChange = (current) => { 
// console.log(current);
// tatalarticleinformation.value.pagenum = 1
articledatamessage.value.pagenum = current
getinformation()

}
// 接下来就是处理点击事件的一些问题
const onserch = () => { //搜索的功能就是根据最新的选择的数据进行筛选
  articlerootref.value.pagenum = 1
  getinformation()
}
const onreset = () => {
  articlerootref.value.pagenum = 1
  articlerootref.value.cate_id = ''
  articlerootref.value.state = ''
  getinformation()
}
const addarticle = () => {
  // 添加文章的内容
  // 点击可以跳出来的就是抽屉的这个组件
  // ondrawerchange.value = true
  drawerdata.value.open({})
}
//传过来一个值
const onsuccess = (data) => {
  if(data === 'add') {
    // 这里就是渲染最后一页
    const total = tatalarticleinformation.value + 1
    let lastpage = Math.ceil(total / articlerootref.value.pagesize)
    articlerootref.value.pagenum = lastpage

  } else {
 console.log(1);
 
  }
  getinformation()
}
</script>

<template>

  <Page-container title="文章分类">
    <template #extra>
      <el-button @click="addarticle">添加文章</el-button>
    </template>
    <!-- 在这里的是顶部的展示的区域 -->
    <el-form inline>
      <el-form-item label="文章分类" style="width: 240px;">
      <channelselect v-model="articledatamessage.cate_id"></channelselect>
    </el-form-item>
      <el-form-item label="发布状态" style="width: 240px;">
        <el-select v-model="articledatamessage.state">
          <el-option label="已发布" value="已发布">已发布</el-option>
          <el-option label="草稿" value="草稿">草稿</el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="onserch" type="primary">搜索</el-button>
        <el-button @click="onreset">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 在下面的这里就是用来存储相关数据的地方 -->
    <el-table :data="articledatamessage" style="width: 100%;" v-loading="loading">
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
    <!-- 下面就是放的是一些表格的数据的切换的东西小组件 -->
    <el-pagination
      v-model:current-page="articlerootref.pagenum"
      v-model:page-size="articlerootref.pagesize"
      :page-sizes="[5, 7, 9, 11]"
      :background="true"
      layout=" jumper, sizes, prev, pager, next, total"
      :total="tatalarticleinformation"
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
      style="justify-content: flex-end"
    />


    <!-- 在下面的就是这个抽屉的一些代码的结构 -->
    <drawerarticle ref="drawerdata" @click="onsuccess"></drawerarticle>
    <template #empty>
      <el-empty description="没有没有数据"></el-empty>
    </template>

  </Page-container>
  
  </template>

<style scoped>

</style>