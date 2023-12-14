<template>
    <div class="wrapper">
        <!-- header部分 -->
        <header>
            <p>历史订单</p>
        </header>
        <div style="margin-top: 12vw"></div>
        <div>
            <div
                class="order"
                v-for="order in orders"
                :key="order.orderid"
            >
                <div v-if="order.orderDetailList != null">
                    <div class="order-info">
                        <p>
                            {{ order.businessName }}
                            <i class="fa fa-caret-right"></i>
                        </p>
                        <div class="order-info-right">
                            <span>合计</span><p>￥{{ order.ordertotal }}</p>
                        </div>
                    </div>
                    <div class="order-detailet">
                        <div
                            v-for="orderItem in order.orderDetailList"
                            :key="orderItem.odid"
                        >
                            <p>{{ orderItem.foodName }} x {{ orderItem.quantity }}</p>
                            <p>￥{{ orderItem.foodPrice * orderItem.quantity }}</p>
                        </div>
                        <div>
                            <span>配送费</span>
                            <span>￥{{order.deliveryPrice}}</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <!-- 空白div -->
        <div style="margin-top: 15vw"></div>

        <!-- 底部 -->
        <Footer style="padding: 0"></Footer>
    </div>
</template>

<script>
import Footer from '@/components/Footer'
import {getOrderListWithDetail} from "@/api/order";

export default {
    name: 'HistoryOrder',
    data() {
        return {
            orders: [],
            orderDetail: [],
        }
    },
    created() {
        this.orderList()
    },
    methods: {
        orderList() {
            getOrderListWithDetail().then((res) => {
                console.log(res)
                this.orders = res
            })
        }
    },
    components: {
        Footer,
    },
}
</script>

<style scoped>
.wrapper {
    width: 100%;
    height: 100%;
    max-width: 800px;
    margin: 0 auto;
}

/*!****************** header部分 ******************!*/
.wrapper header {
    width: 100%;
    height: 12vw;

    background-color: #0097ff;
    color: #fff;
    font-size: 4.8vw;

    position: fixed;
    left: 0;
    top: 0;
    z-index: 1000;

    display: flex;
    justify-content: center;
    align-items: center;

    /*border: 1px red solid;*/
}

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

.order {
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    overflow: hidden;

}

.order-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
}

.order-info p {
    font-size: 16px;
    font-weight: bold;
    color: #333;
    margin-right: 10px;
}

.order-info i {
    font-size: 12px;
    color: #999;
    transition: transform 0.2s ease;
}

.order-info-right {
    display: flex;
    align-items: center;
}
.order-info-right span{
    font-size: 12px;
    color: #666;
}

.order-info-right p {
    font-size: 12px;
    font-weight: bold;
    margin-right: 10px;
}

/*订单详情*/
.order-detailet {
    border-top: 1px solid #e5e5e5;
    padding: 10px;
}

.order-detailet div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;

    font-size: 12px;
    color: #666;

    /*border: 1px red solid;*/
}
</style>
