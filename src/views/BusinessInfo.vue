<template>
    <div class="wrapper">
        <!-- header部分 -->
        <header>
            <p>商家信息</p>
        </header>

        <!-- 商家logo部分 -->
        <div class="business-logo">
            <img src="../assets/img/sj01.png"/>
        </div>

        <!-- 商家信息部分 -->
        <div class="business-info">
            <h1>万家饺子（软件园E18店）</h1>
            <p>&#165;15起送 &#165;3配送</p>
            <p>各种饺子炒菜</p>
        </div>

        <!-- 食品列表部分 -->
        <div class="food">
            <li>
                <div class="food-left">
                    <img src="../assets/img/sp01.png"/>
                    <div class="food-left-info">
                        <h3>纯肉鲜肉（水饺）</h3>
                        <p>新鲜猪肉</p>
                        <p>&#165;15</p>
                    </div>
                </div>
                <div class="food-right">
                    <div>
                        <i class="fa fa-minus-circle"></i>
                    </div>
                    <p><span>3</span></p>
                    <div>
                        <i class="fa fa-plus-circle"></i>
                    </div>
                </div>
            </li>
            <li>
                <div class="food-left">
                    <img src="../assets/img/sp02.png"/>
                    <div class="food-left-info">
                        <h3>玉米鲜肉（水饺）</h3>
                        <p>玉米鲜肉</p>
                        <p>&#165;16</p>
                    </div>
                </div>
                <div class="food-right">
                    <div>
                        <i class="fa fa-minus-circle"></i>
                    </div>
                    <p><span>2</span></p>
                    <div>
                        <i class="fa fa-plus-circle"></i>
                    </div>
                </div>
            </li>
            <li>
                <div class="food-left">
                    <img src="../assets/img/sp03.png"/>
                    <div class="food-left-info">
                        <h3>虾仁三鲜（蒸饺）</h3>
                        <p>虾仁三鲜</p>
                        <p>&#165;22</p>
                    </div>
                </div>
                <div class="food-right">
                    <div></div>
                    <p></p>
                    <div><i class="fa fa-plus-circle"></i></div>
                </div>
            </li>
            <li>
                <div class="food-left">
                    <img src="../assets/img/sp04.png"/>
                    <div class="food-left-info">
                        <h3>素三鲜（蒸饺）</h3>
                        <p>素三鲜</p>
                        <p>&#165;15</p>
                    </div>
                </div>
                <div class="food-right">
                    <div></div>
                    <p></p>
                    <div>
                        <i class="fa fa-plus-circle"></i>
                    </div>
                </div>
            </li>
            <li>
                <div class="food-left">
                    <img src="../assets/img/sp05.png"/>
                    <div class="food-left-info">
                        <h3>角瓜鸡蛋（蒸饺）</h3>
                        <p>角瓜鸡蛋</p>
                        <p>&#165;16</p>
                    </div>
                </div>
                <div class="food-right">
                    <div></div>
                    <p></p>
                    <div>
                        <i class="fa fa-plus-circle"></i>
                    </div>
                </div>
            </li>
            <li>
                <div class="food-left">
                    <img src="../assets/img/sp06.png"/>
                    <div class="food-left-info">
                        <h3>小白菜肉（水饺）</h3>
                        <p>小白菜肉</p>
                        <p>&#165;18</p>
                    </div>
                </div>
                <div class="food-right">
                    <div></div>
                    <p></p>
                    <div>
                        <i class="fa fa-plus-circle"></i>
                    </div>
                </div>
            </li>
            <li>
                <div class="food-left">
                    <img src="../assets/img/sp07.png"/>
                    <div class="food-left-info">
                        <h3>芹菜牛肉（水饺）</h3>
                        <p>芹菜牛肉</p>
                        <p>&#165;18</p>
                    </div>
                </div>
                <div class="food-right">
                    <div></div>
                    <p></p>
                    <div>
                        <i class="fa fa-plus-circle"></i>
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
                    <div class="cart-left-icon-quantity">3</div>
                </div>
                <div class="cart-left-info">
                    <p>&#165;12.88</p>
                    <p>另需配送费3元</p>
                </div>
            </div>
            <div class="cart-right">
                <!-- 不够起送费 -->
                <!--
                          <div class="cart-right-item">
                          &#165;15起送
                          </div>
                          -->
                <!-- 达到起送费 -->
                <div class="cart-right-item" @click="$router.push('/order')">
                    去结算
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'BusinessInfo',
    data() {
        return {
            business: {},
        }
    },
    created() {
        this.business = this.$route.query
        // console.log(this.business)
    },
    methods:{

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
