import request from '@/utils/request'

//获取用户的地址列表
export function getAddressOfUser(userId){
    return request({
        url: '/address/getAllAddress',
        method: "get",
        params: {
            userId: userId
        }
    })
}
