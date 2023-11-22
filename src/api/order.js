import request from '@/utils/request'

//订单列表
export function getOrderListWithDetail(){
    return request({
        url: '/orders/getAllOrders',
        method: 'get',
    })
}
