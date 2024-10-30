import axios from 'axios'
import { UseUserStore } from '@/stores' 
import { ElMessage } from 'element-plus'
import router from '@/router'

const baseURL = 'http://big-event-vue-api-t.itheima.net'

const instance = axios.create({
  // TODO 1. 基础地址，超时时间
  baseURL,
  timeout:5000
})
//请求拦截器
instance.interceptors.request.use(
  (config) => {
    // TODO 2. 携带token
    const userstore = UseUserStore()
    if(userstore.token){
        config.headers.Authorization=userstore.token 
    }
    return config
  },
  (err) => Promise.reject(err)
) 
//响应拦截器
instance.interceptors.response.use(
  (res) => {
    // TODO 3. 处理业务失败
    // TODO 4. 摘取核心响应数据
    if(res.data.code===0){ //在这里的接口文档里面写的就是这个code=0的条件下就是正确的响应
        return res
    }
    ElMessage.error(res.data.message || "服务异常!!!")
    return Promise.reject(res)
  },
  (err) => {
    // TODO 5. 处理401错误
    ElMessage.error(err.data.message || "服务异常!!!")
    if(err.response.status===401){ //这里发现token的值没有或者过期的话就会发生的是跳回到登录页面重新登录
        router.push('/login')
    }
    return Promise.reject(err)
  }
)

export default instance
export {baseURL}