import { defineStore } from "pinia";
import { ref } from 'vue';

export const UseUserStore = defineStore('big-user',()=>{
    const token = ref('')
    const settoken = (newtoken) => {
        token.value = newtoken
    }
    const removetoken = () => {
        token.value=''
    }
    return {
        token,
        settoken,
        removetoken
    }},{
        persist:true //持久化存储到本地的浏览器中
    }
)
    