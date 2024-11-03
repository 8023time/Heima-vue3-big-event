import request from '@/utils/request'

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
export const deletearticleinformation = (data) => {
    return request.delete('/my/cate/del',data)
}