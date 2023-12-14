import request from '@/utils/request'

//订单列表
export function getOrderListWithDetail(){
    return request({
        url: '/orders/getAllOrders',
        method: 'get',
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
