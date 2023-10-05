import request from '@/utils/request'

//获取所有商家分类
export function getAllType() {
    return request({
        url: '/businessType/getAllType',
        method: 'get',
    })
}

//获取商家列表，按订单数量降序排序或商家列表按评分降序排序
export function getAllBusiness(sortWay){
    return request({
        url: '/business/getAllBusiness',
        method: 'get',
        params:{sortWay}
    })
}
