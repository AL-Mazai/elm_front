<template>
    <div class="wrapper">
        <!-- header部分 -->
        <header>
            <p>确认订单</p>
        </header>

        <!-- 订单地址信息部分 -->
        <div class="order-info">
            <h5>订单配送至：</h5>
            <div class="order-info-address" @click="this.dialogVisible = true;">
                <p>{{ orderAddress.address }}</p>
                <i class="fa fa-angle-right"></i>
            </div>
            <p>{{ orderAddress.contactname }} {{ orderAddress.contacttel }}</p>
        </div>
        <h3>{{ business.businessName }}</h3>

        <!-- 订单明细部分 -->
        <div class="order-detailed">
            <li
                v-for="orderItem in order"
                :key="orderItem.foodid"
            >
                <div class="order-detailed-left">
                    <img :src="orderItem.foodimg"/>
                    <p>{{ orderItem.foodname }} x {{ orderItem.orderFoodNum }}</p>
                </div>
                <p>￥{{ orderItem.foodprice }} / 份</p>
            </li>
        </div>
        <div class="order-deliveryfee">
            <p>配送费</p>
            <p>￥{{ business.deliveryPrice }}</p>
        </div>

        <!-- 合计部分 -->
        <div class="total">
            <div class="total-left">合计 ￥{{ totalMoney }}</div>
            <div class="total-right" @click="this.$router.push('/Payment')">支付订单</div>
        </div>

        <!--  弹出的地址列表框 -->
        <el-dialog v-model="dialogVisible" title="选择地址"
                   @close="this.dialogVisible = false;"
                   width="90%"
        >
            <!--地址列表 -->
            <el-card v-for="address in addressList"
                     :key="address.id"
                     style="margin-bottom: 1vh" @click="selectAddress(address)"
            >
                <p>{{ address.address }}</p>
                <span>{{ address.contactname }} {{ address.contacttel }} </span>
            </el-card>
        </el-dialog>
    </div>
</template>

<script>
import {
    getAddressOfUser,
}
    from "@/api/address";
import {ElMessageBox} from "element-plus";

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Order',
    data() {
        return {
            user: '',  //当前用户
            orderAddress: '', //订单地址
            addressList: [], //地址列表
            dialogVisible: false
        }
    },
    created() {
        this.user = JSON.parse(localStorage.getItem("userInfo")).data
        //初始化地址列表
        getAddressOfUser(this.user.userid).then((res) => {
            this.addressList = res
            // console.log(this.addressList[0])
            if(this.addressList.length != 0){
                this.orderAddress = this.addressList[0]
                sessionStorage.setItem("orderAddress", JSON.stringify(res[0]))
            }else {
                ElMessageBox.confirm(
                    '请先设置您的地址',
                    '提示',
                    {
                        confirmButtonText: '去设置',
                        cancelButtonText: '取消订单',
                    }
                )
                    .then(() => {
                        this.$router.push('/address')
                    })
                    .catch(() => {
                        this.$router.push('/')
                    })
            }
        })

    },
    computed: {
        order() {
            return JSON.parse(sessionStorage.getItem("foodList"))
        },
        business() {
            return JSON.parse(sessionStorage.getItem("business"))
        },
        totalMoney() {
            return parseFloat(JSON.parse(sessionStorage.getItem("totalMoney")))
        }
    },
    methods: {
        selectAddress(address) {
            this.orderAddress = address
            this.dialogVisible = false
            sessionStorage.setItem("orderAddress", JSON.stringify(address))
            // console.log(address)
        }
    }
}
</script>

<style scoped>
.wrapper {
    width: 100%;
    height: 100%;
}

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
}

.wrapper .order-info {
    width: 100%;
    margin-top: 12vw;
    background-color: #0097ef;
    box-sizing: border-box;
    padding: 2vw;
    color: #fff;
}

.wrapper .order-info h5 {
    font-size: 3vw;
    font-weight: 300;
}

.wrapper .order-info .order-info-address {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 700;
    user-select: none;
    cursor: pointer;
    margin: 1vw 0;
}

.wrapper .order-info .order-info-address p {
    width: 90%;
    font-size: 5vw;
}

.wrapper .order-info .order-info-address i {
    font-size: 6vw;
}

.wrapper .order-info p {
    font-size: 3vw;
}

.wrapper h3 {
    box-sizing: border-box;
    padding: 3vw;
    font-size: 4vw;
    color: #666;
    border-bottom: solid 1px #ddd;
}

.wrapper .order-detailed {
    width: 100%;
}

.wrapper .order-detailed li {
    width: 100%;
    height: 16vw;
    box-sizing: border-box;
    padding: 3vw;
    color: #666;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.wrapper .order-detailed li .order-detailed-left {
    display: flex;
    align-items: center;
}

.wrapper .order-detailed li .order-detailed-left img {
    width: 10vw;
    height: 10vw;
}

.wrapper .order-detailed li .order-detailed-left p {
    font-size: 3.5vw;
    margin-left: 3vw;
}

.wrapper .order-detailed li p {
    font-size: 3.5vw;
}

.wrapper .order-deliveryfee {
    width: 100%;
    height: 16vw;
    box-sizing: border-box;
    padding: 3vw;
    color: #666;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 3.5vw;
}

.wrapper .total {
    width: 100%;
    height: 14vw;
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
}

.wrapper .total .total-left {
    flex: 2;
    background-color: #505051;
    color: #fff;
    font-size: 4.5vw;
    font-weight: 700;
    user-select: none;
    display: flex;
    justify-content: center;
    align-items: center;
}

.wrapper .total .total-right {
    flex: 1;
    background-color: #38ca73;
    color: #fff;
    font-size: 4.5vw;
    font-weight: 700;
    user-select: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
