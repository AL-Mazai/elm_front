import request from '@/utils/request'

//获取食品信息
export function getFoodInfo(foodId){
    return request({
        url:'/food/getFoodInfo',
        method: 'get',
        params: {foodId}
    })
}
