<template>
    <div class="wrapper">
        <!-- header部分 -->
        <header>
            <p>支付订单</p>
        </header>

        <div class="total-money">
            ￥{{ totalMoney }}
        </div>
        <div class="businessName">
            {{ business.businessName }}
        </div>

        <!-- 支付方式部分 -->
        <div class="payment-type">
            <div class="payment-select">
                <img src="../assets/img/alipay.png"/>
                <label>
                    <input type="radio" name="payment" value="alipay" checked/>
                </label>
            </div>
            <div class="payment-select">
                <img src="../assets/img/wechat.png"/>
                <label>
                    <input type="radio" name="payment" value="wechat"/>
                </label>
            </div>
        </div>

        <div class="payment-button">
            <button>确认支付</button>
        </div>
    </div>
</template>

<script>
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Payment',
    data() {
        return {
            totalMoney: 0,  //总金额
            business: '', //商家
        }
    },
    created() {
        this.business = JSON.parse(this.$route.query.business)
        this.totalMoney = parseFloat(JSON.parse(this.$route.query.totalMoney))
    }
};
</script>

<style scoped>
.wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.wrapper header {
    width: 100%;
    height: 12vw;
    background-color: #0097ff;
    color: #fff;
    font-size: 4.8vw;
    display: flex;
    justify-content: center;
    align-items: center;
}

.wrapper .total-money {
    font-weight: bold;
    margin: 5vw 0 1vw 0;
    text-align: center;
    font-size: 6vw;
}
.wrapper .businessName {
    margin: 1vw 0 5vw 0;
    text-align: center;
    font-size: 3vw;
    color: #8d9396;
}

.wrapper .total-money h3 {
    /*border: 1px red solid;*/
}

.wrapper .payment-type {
    width: 100%;
}

.wrapper .payment-select {
    margin: 1vw 1vw 1vw 1vw;
    display: flex;
    align-items: center;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
    padding: 10px;

    position: relative;
    border-radius: 50px;
}

.wrapper .payment-select label {
    position: absolute;
    right: 5vw;
}

.wrapper .payment-select img {
    width: 150px;
}

/*.wrapper .payment-select label input[type='radio'] {*/
/*    order: 1;*/
/*    margin-left: auto;*/
/*}*/

.payment-button {
    width: 100%;
    box-sizing: border-box;
    padding: 2vw;
    position: fixed;
    bottom: 0;
    left: 0;
}

.payment-button button {
    width: 100%;
    height: 12vw;

    font-size: 6vw;
    border: none;
    outline: none;
    border-radius: 10vw;
    background-color: #38ca73;
    color: #fff;
}
</style>
