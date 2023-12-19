<template>
    <div class="wrapper">
        <!-- header部分 -->
        <header>
            <p>商家信息</p>
        </header>

        <!-- 商家logo部分 -->
        <div class="business-logo">
            <img :src="business.businessImg"/>
        </div>

        <!-- 商家信息部分 -->
        <div class="business-info">
            <h1>{{ business.businessName }}</h1>
            <p>&#165;{{ business.starPrice }}起送 &#165;{{ business.deliveryPrice }}配送</p>
            <p>{{ business.businessIntroduction }}</p>
        </div>

        <!--没有食物-->
        <div v-if="business.foodList == ''">
            <div class="no-food">
                该商家还没有食物
            </div>
        </div>
        <!-- 食品列表部分 -->
        <div class="food">
            <li
                v-for="food in business.foodList"
                :key="food.foodid"
            >
                <!--食物信息-->
                <div class="food-left">
                    <img :src="food.foodimg"/>
                    <div class="food-left-info">
                        <h3>{{ food.foodname }}</h3>
                        <p>{{ food.foodexplain }}</p>
                        <p>&#165;{{ food.foodprice }}</p>
                    </div>
                </div>
                <div class="food-right">
                    <div>
                        <i class="fa fa-minus-circle" @click="reduceOrderFoodNum(food)"></i>
                    </div>
                    <p><span>{{ food.orderFoodNum }}</span></p>
                    <div>
                        <i class="fa fa-plus-circle" @click="addOrderFoodNum(food)"></i>
                    </div>
                </div>
            </li>
        </div>

        <!-- 空白div -->
        <div>&nbsp;&nbsp;&nbsp;</div>

        <!-- 购物车部分 -->
        <div class="cart">
            <div class="cart-left">
                <div class="cart-left-icon">
                    <i class="fa fa-shopping-cart"></i>
                    <div class="cart-left-icon-quantity">{{ orderFoodTotalNum }}</div>
                </div>
                <div class="cart-left-info">
                    <p>￥{{ totalMoney }}</p>
                    <p>另需配送费{{ business.deliveryPrice }}元</p>
                </div>
            </div>
            <div class="cart-right">
                <!-- 不够起送费 -->
                <div v-if="totalMoney < 15" class="cart-right-item" style="background-color: #aaa;">
                    &#165;{{ business.starPrice }}起送
                </div>
                <!-- 达到起送费 -->
                <div v-else class="cart-right-item" @click="confirmOrder" style="background-color: #38ca73;">
                    去结算
                </div>
            </div>
        </div>
    </div>
</template>

<script>

// import {getAllFood} from "@/api/business";

export default {
    name: 'BusinessInfo',
    data() {
        return {
            business: {},  //商家信息
            // business.foodList: [], //商家食品列表
            orderFoodTotalNum: 0, //下单的食品总数
            totalMoney: 0,  //总金额
            orderList: [],  //下单列表
        }
    },
    created() {
        this.business = JSON.parse(sessionStorage.getItem("business"))

        console.log(this.business.foodList)
        // this.foodList()
    },
    methods: {
        // //获取食品列表
        // foodList() {
        //     let businessId = this.business.businessId
        //     getAllFood(businessId).then((res) => {
        //         this.business.foodList = res
        //     })
        // },
        /*************下单******************/
        addOrderFoodNum(food) {
            food.orderFoodNum += 1
            this.orderFoodTotalNum += 1

            this.totalMoney += food.foodprice
        },
        reduceOrderFoodNum(food) {
            if (food.orderFoodNum > 0) {
                this.orderFoodTotalNum -= 1
                food.orderFoodNum -= 1

                this.totalMoney -= food.foodprice
            }
        },
        //跳转到确认订单页面
        confirmOrder() {
            let foodList = this.business.foodList.filter(food => food.orderFoodNum > 0);
            console.log(foodList)
            let user = localStorage.getItem("userInfo")
            if(user === null){
                this.$message.warning({
                    message: "请先登录",
                    duration: 800
                })
                this.$router.push('/login')
            }else{
                let totalMoney = this.totalMoney + this.business.deliveryPrice
                this.$store.commit("businessInfoToOrder", {foodList, totalMoney})
                this.$router.push('/Order');
                // this.$router.push({
                //     path: 'Order',
                //     query: {
                //         foodList: JSON.stringify(foodList),
                //         business: JSON.stringify(this.business),
                //         totalMoney: JSON.stringify(this.totalMoney),
                //     }
                // });
            }
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

.wrapper .business-logo {
    width: 100%;
    height: 35vw;
    margin-top: 12vw;
    display: flex;
    justify-content: center;
    align-items: center;
}

.wrapper .business-logo img {
    width: 40vw;
    height: 30vw;
    border-radius: 5px;
}

.wrapper .business-info {
    width: 100%;
    height: 20vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.wrapper .business-info h1 {
    font-size: 5vw;
}

.wrapper .business-info p {
    font-size: 3vw;
    color: #666;
    margin-top: 1vw;
}

.wrapper .food {
    width: 100%;
    margin-bottom: 14vw;
}

.wrapper .food li {
    width: 100%;
    box-sizing: border-box;
    padding: 2.5vw;
    user-select: none;
    border-bottom: solid 1px #ddd;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.wrapper .food li .food-left {
    display: flex;
    align-items: center;
}

.wrapper .food li .food-left img {
    width: 20vw;
    height: 20vw;
}

.wrapper .food li .food-left .food-left-info {
    margin-left: 3vw;
}

.wrapper .food li .food-left .food-left-info h3 {
    font-size: 3.8vw;
    color: #555;
}

.wrapper .food li .food-left .food-left-info p {
    font-size: 3vw;
    color: #888;
    margin-top: 2vw;
}

.wrapper .food li .food-right {
    width: 16vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.wrapper .food li .food-right .fa-minus-circle {
    font-size: 5.5vw;
    color: #999;
    cursor: pointer;
}

.wrapper .food li .food-right p {
    font-size: 3.6vw;
    color: #333;
}

.wrapper .food li .food-right .fa-plus-circle {
    font-size: 5.5vw;
    color: #0097ef;
    cursor: pointer;
}

.wrapper .cart {
    width: 100%;
    height: 14vw;
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
}

.wrapper .cart .cart-left {
    flex: 2;
    background-color: #505051;
    display: flex;
}

.wrapper .cart .cart-left .cart-left-icon {
    width: 16vw;
    height: 16vw;
    box-sizing: border-box;
    border: solid 1.6vw #444;
    border-radius: 8vw;
    background-color: #3190e8;
    font-size: 7vw;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: -4vw;
    margin-left: 3vw;
    position: relative;
}

.wrapper .cart .cart-left .cart-left-icon-quantity {
    width: 5vw;
    height: 5vw;
    border-radius: 2.5vw;
    background-color: red;
    color: #fff;
    font-size: 3.6vw;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: -1.5vw;
    top: -1.5vw;
}

.wrapper .cart .cart-left .cart-left-info p:first-child {
    font-size: 4vw;
    color: #fff;
    margin-top: 1vw;
}

.wrapper .cart .cart-left .cart-left-info p:last-child {
    font-size: 1.8vw;
    color: #aaa;
}

.wrapper .cart .cart-right {
    flex: 1;
}

.wrapper .cart .cart-right .cart-right-item {
    width: 100%;
    height: 100%;
    color: #fff;
    font-size: 4.5vw;
    font-weight: 700;
    user-select: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
}

.no-food {
    display: flex; /* 使用 Flexbox 布局 */
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
    /*height: 80vh; !* 设置高度为视口高度，使元素占满整个屏幕 *!*/

    margin-top: 20vh;

    font-size: 30px;
    color: #d2d2c8;
}
</style>
