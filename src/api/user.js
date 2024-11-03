import request from '@/utils/request'
    
//注册
export const userregisterservice = ({username, password, repassword}) => {
    return request.post('/api/reg',{username, password, repassword})
}

//登录
export const userloginservice = ({username, password}) => {
    return request.post('/api/login',{username, password})
}

//获取用户的个人信息
export const getuserinformation = () => {
    return request.get('/my/userinfo')
}