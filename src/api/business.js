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

export function getAllBusinessByType(typeId){
    return request({
        url:'/business/getAllBusinessOfType',
        method: 'get',
        params: {typeId}
    })
}

//获取商家信息
export function getBusinessInfo(businessId){
    return request({
        url: '/business/getBusinessInfo',
        method: 'get',
        params: {businessId}
    })
}

// //获取商家的食物列表
// export function  getAllFood(businessId){
//     return request({
//         url: '/food/foodList',
//         method: 'get',
//         params: {businessId}
//     })
// }
