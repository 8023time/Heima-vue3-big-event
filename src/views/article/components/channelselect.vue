<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { ref } from 'vue'
import { getarticlechannelinformation } from '@/api/article'
const channellist = ref([])
defineProps({
    modelvalue:{
        type: [Number,String]
    }
})
const getchannellist = async () => {
    const res = await getarticlechannelinformation()
    channellist.value = res.data.data
    console.log(channellist.value);
}
getchannellist()
</script>

<template>
        <el-select :modelvalue="modelvalue" @update:modelvalue="emit('update:modelvalue', $event)"> 
          <el-option v-for=" item in channellist" :key="item.id"  :value="item.id" :label="item.cate_name"></el-option>
        </el-select>
</template>

<style>

</style>