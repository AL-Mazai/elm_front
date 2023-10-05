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

//新增地址
export function addAddress(address){
    return request({
        url: '/address/addAddress',
        method: "post",
        data: address
    })
}
//删除地址
export function removeAddress(addressId){
    return request({
        url: '/address/deleteAddress',
        method: 'delete',
        params:{
            addressId: addressId
        }
    })
}

//编辑地址
export function updateAddress(address){
    return request({
        url: '/address/updateAddress',
        method: 'put',
        data: address
    })
}
