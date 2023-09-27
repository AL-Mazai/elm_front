import request from '@/utils/request'

//获取所有商家分类
export function getAllType() {
    return request({
        url: '/businessType/getAllType',
        method: 'get',
    })
}
