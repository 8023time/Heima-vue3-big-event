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


// 在下面就是更新用户的一些个人的信息方面的东西
export const personaluserinformation = ( data ) => {
    return request.put('/my/userinfo', data)
}
// 获取用户的基本信息
export const getpersonaluserinformation = () => {
    return request.get('/my/userinfo')
}

// 下面的就是一些新的模块
export const updatauserpicture = (avatar) => {
    return request.patch('/my/update/avatar', {avatar})
}
export const updatauserpassword = ({old_pwd, new_pwd, re_pwd}) => {
    return request.patch('/my/updatepwd',{old_pwd, new_pwd, re_pwd})
}