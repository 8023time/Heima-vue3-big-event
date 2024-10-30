<script setup>
import { useRoute,useRouter} from 'vue-router'
import { UseUserStore } from '@/stores/index'
const router = useRouter()
const route = useRoute()
const change = () => {
  router.push('/oppp')
  console.log(router,route);
  
}
 
const UserStore = UseUserStore()
</script>

<template>
<div>
  APP
  <button @click="UserStore.settoken('aaaaaaaaaaaaa')">点击一下</button>
  <div>{{ UserStore.token }}</div>
  <button @click="UserStore.removetoken()">在了</button>
  <br>
  <button @click="$router.push('/home')">首页</button>
  <button @click="$router.push('/list')">下一个页面</button>
  <button @click="change">下辖</button>
</div>
</template>

<style scoped>

</style>
