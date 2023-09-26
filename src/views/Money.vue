<template>
    <div class="wrapper">
        <!-- header部分 -->
        <div class="header-title">
            <div
                style="margin-top: 2.5vw; font-size: 7vw; margin-right: 34vw"
                @click="$router.push('/userInfo')"
            >
                <el-icon><ArrowLeft /></el-icon>
            </div>
            <div style="margin-top: 3.5vw; font-size: 5vw">我的钱包</div>
        </div>

        <!-- 用户信息和余额 -->
        <div class="user-info">
            <div style="font-size: 6vw;margin-top: 2vw;margin-left: 2vw">
                {{ userInfo.username }}
                <span style="font-size: 12px;border-radius: 10px;background-color: red;padding: 1px">实名认证></span>
            </div>
            <div style="display: flex">
                <div class="money-model">
                    <p>余额</p>
                    <p>{{ formatCurrency(userInfo.money) }}</p>
                </div>
                <div class="money-model">
                    <p>银行卡</p>
                    <p>1张</p>
                </div>
                <div class="money-model">
                    <p>大约可借</p>
                    <p>7.1万</p>
                </div>
                <div class="money-model">
                    <p>预估额度</p>
                    <p>10086元</p>
                </div>
            </div>
        </div>

        <!-- 银行卡模块 -->
        <div class="bank-cards" style="position: relative">
            <h2>我的银行卡</h2>
            <div>
                <div v-for="card in bankCards" :key="card.id">
                    <span>{{ card.bankName }}</span>
                    <span>{{ card.cardNumber }}</span>
                </div>
            </div>
            <el-button
                type="primary"
                @click="addBankCard"
                style="position: absolute; right: 1vw; bottom: 1vw"
            >添加银行卡
            </el-button
            >
        </div>

        <!-- 借钱模块 -->
        <div class="borrow" style="position: relative">
            <h2>借呗</h2>
            <p>可用额度: {{ borrowBee.creditLimit }}</p>
            <p>已借金额: {{ borrowBee.borrowedAmount }}</p>
            <el-button
                type="primary"
                @click="applyForBorrowBee"
                style="position: absolute; right: 1vw; bottom: 1vw"
            >申请额度
            </el-button
            >
        </div>

        <!-- 交易记录 -->
        <div class="transaction-history">
            <h2>交易记录</h2>

            <div v-for="transaction in transactionHistory" :key="transaction.id">
                <span>{{ transaction.date }}</span>
                <span>{{ transaction.description }}</span>
                <span>{{ formatCurrency(transaction.amount) }}</span>
            </div>
        </div>

        <div style="height: 20vw"></div>
    </div>
</template>

<script>
import {getExpire} from "@/utils/localStorage";

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Money',
    data() {
        return {
            userInfo: {},
            transactionHistory: [
                {
                    id: 1,
                    date: '2023-09-20',
                    description: '充值',
                    amount: 500,
                },
                {
                    id: 2,
                    date: '2023-09-19',
                    description: '消费',
                    amount: -300,
                },
                // 添加更多交易记录
            ],
            bankCards: [
                {
                    id: 1,
                    bankName: '中国银行',
                    cardNumber: '**** **** **** 1234',
                },
                // 添加更多银行卡
            ],

            borrowBee: {
                creditLimit: 5000,
                borrowedAmount: 0,
            },
        }
    },
    created() {
        this.userInfo = getExpire("userInfo")
    },
    methods: {
        formatPhoneNumber(phone) {
            // 格式化手机号码
            return `${phone.substr(0, 3)}****${phone.substr(7)}`
        },
        formatCurrency(amount) {
            // 格式化货币金额
            return `${amount.toFixed(2)}`
        },
        addBankCard() {
            // 处理添加银行卡逻辑
            // 可以打开一个弹窗或跳转到添加银行卡页面
        },

        applyForBorrowBee() {
            // 处理申请借呗逻辑
            // 可以打开一个弹窗或跳转到借呗申请页面
        },
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
.header-title {
    width: 100%;
    height: 12vw;
    background-color: #0097ff;
    color: #fff;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1000;
    display: flex;
}

.user-info {
    background-color: #fff;

    padding: 5px;
    margin-top: 12vw;

    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
}
.money-model{
    width: 25%;

    text-align: center;

    /*border: solid 1px red;*/
}
.bank-cards {
    background-color: #fff;
    padding: 5px;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
    margin-top: 10px;
    border-radius: 10px;
}

.borrow {
    background-color: #fff;
    padding: 5px;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
    margin-top: 10px;
    border-radius: 10px;
}

.transaction-history {
    background-color: #fff;
    padding: 5px;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
    margin-top: 10px;
    border-radius: 10px;
}

.transaction-history div {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    font-size: 16px;
}
</style>
