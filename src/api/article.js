import request from '@/utils/request'
// 分类相关的api
// 获取文章的一些信息
export const getarticlechannelinformation = () => {
    return request.get('/my/cate/list')
}
// 修改文章地信息
export const changearticleinformation= (data) => {
    return request.put('/my/cate/info', data)
}
// 增加文章地信息
export const addarticleinformation = (data) =>{
    return request.post('/my/cate/add',data)
}
//删除文章分类
export const deletearticleinformation = (id) => {
    return request.delete('/my/cate/del',{
        params: {id}
    })
}



// 下面是关于文章相关的api
// 获取文章列表
export const getarticlelist = (data) => {
    return request.get('/my/article/list', {
        params:data
    })
}
// 获取文章详情
export const getarticlelistinformation = ( id ) => {
    return request.get('/my/article/info', {
        params:{id}
    })
}
// 删除文章
export const deletearticlelistinformation = ( id ) => {
    return request.delete('/my/article/info', {
        params:{ id }
    })
}
// 发布文章
export const putarticlelistinformation = ({ title, cate_id, content, cover_img, state }) => {
    return request.put('/my/article/add', {
        params:{ title, cate_id, content, cover_img, state }
    })
}
// 修改文章内容
export const changearticlelistinformation = ({ title, cate_id, content, cover_img, state }) => {
    return request('/my/article/info', {
        params:{ title, cate_id, content, cover_img, state }
    })
}