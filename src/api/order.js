import request from '@/utils/request'

//订单列表
export function getOrderListWithDetail(userId){
    return request({
        url: '/orders/getAllOrders',
        method: 'get',
        params:{userId}
    })
}

//保存订单
export function saveOrder(orders){
    return request({
        url: '/orders/saveOrders',
        method: 'post',
        data: orders
    })
}
