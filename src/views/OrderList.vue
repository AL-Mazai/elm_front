<template>
    <div class="wrapper">


        <!-- header部分 -->
        <header>
            <p>我的订单</p>
        </header>

        <!-- 订单列表部分 -->
        <div>
            <h3>未支付订单信息：</h3>
            <div class="order">
                <div>
                    <div class="order-info">
                        <p>
                            万家饺子（软件园E18店）
                            <i class="fa fa-caret-down"></i>
                        </p>
                        <div class="order-info-right">
                            <p>&#165;49</p>
                            <div class="order-info-right-icon" @click="$router.push('/payment')">去支付</div>
                        </div>
                    </div>
                    <div class="order-detailet">
                        <div>
                            <p>纯肉鲜肉（水饺） x 2</p>
                            <p>&#165;15</p>
                        </div>
                        <div>
                            <p>玉米鲜肉（水饺） x 1</p>
                            <p>&#165;16</p>
                        </div>
                        <div>
                            <p>配送费</p>
                            <p>&#165;3</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="order-info">
                        <p>
                            小锅饭豆腐馆（全运店）
                            <i class="fa fa-caret-down"></i>
                        </p>
                        <div class="order-info-right">
                            <p>&#165;55</p>
                            <div class="order-info-right-icon" @click="$router.push('/payment')">去支付</div>
                        </div>
                    </div>
                    <div class="order-detailet">
                        <div>
                            <p>纯肉鲜肉（水饺） x 2</p>
                            <p>&#165;15</p>
                        </div>
                        <div>
                            <p>玉米鲜肉（水饺） x 1</p>
                            <p>&#165;16</p>
                        </div>
                        <div>
                            <p>配送费</p>
                            <p>&#165;3</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div>
            <h3>已支付订单信息：</h3>
            <div class="order">
                <div>
                    <div class="order-info">
                        <p>
                            万家饺子（软件园E18店）
                            <i class="fa fa-caret-down"></i>
                        </p>
                        <div class="order-info-right">
                            <p>&#165;49</p>
                        </div>
                    </div>
                    <div class="order-detailet">
                        <div>
                            <p>纯肉鲜肉（水饺） x 2</p>
                            <p>&#165;15</p>
                        </div>
                        <div>
                            <p>玉米鲜肉（水饺） x 1</p>
                            <p>&#165;16</p>
                        </div>
                        <div>
                            <p>配送费</p>
                            <p>&#165;3</p>
                        </div>
                    </div>
                </div>

            </div>
            <div>
                <div class="order-info">
                    <p>
                        小锅饭豆腐馆（全运店）
                        <i class="fa fa-caret-down"></i>
                    </p>
                    <div class="order-info-right">
                        <p>&#165;55</p>
                    </div>
                </div>
                <div class="order-detailet">
                    <div>
                        <p>纯肉鲜肉（水饺） x 2</p>
                        <p>&#165;15</p>
                    </div>
                    <div>
                        <p>玉米鲜肉（水饺） x 1</p>
                        <p>&#165;16</p>
                    </div>
                    <div>
                        <p>配送费</p>
                        <p>&#165;3</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- 空白div -->
        <div>&nbsp;&nbsp;&nbsp;</div>

        <!-- 底部 -->
        <Footer style="padding: 0"></Footer>
    </div>
</template>

<script>
import Footer from "@/components/Footer";

export default {
    name: "OrderList",
    components: {
        Footer
    },
}
</script>

<style scoped>
/****************** 总容器 ******************/
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

    background-color: #0097FF;
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

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

/* 订单列表部分 */
h3 {
    font-size: 18px;
    color: #333;
    font-weight: bold;

    margin-top: 15vw;
    margin-bottom: 2vw;
    margin-left: 10px;
}

.order {
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    /*margin-bottom: 20px;*/
    overflow: hidden;
}

.order-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f5f5f5;
    padding: 12px 16px;
}

.order-info p {
    font-size: 12px;
    font-weight: bold;
    color: #333;
    margin-right: 10px;
}

.order-info i {
    font-size: 12px;
    color: #999;
    transition: transform 0.2s ease;
}

.order-info i .rotate {
    transform: rotate(-180deg);
}

.order-info-right {
    display: flex;
    align-items: center;
}

.order-info-right p {
    font-size: 14px;
    font-weight: bold;
    color: #ff9800;
    margin-right: 10px;
}

.order-info-right-icon {
    background-color: #ff9800;
    color: #fff;
    font-size: 12px;
    font-weight: bold;
    padding: 4px 4px;
    border-radius: 5px;
    cursor: pointer;
}

.order-detailet {
    border-top: 1px solid #e5e5e5;
    padding: 16px;
}

.order-detailet div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
}

.order-detailet div p {
    font-size: 12px;
    color: #666;
}
</style>