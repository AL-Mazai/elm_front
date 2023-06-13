<template>
    <div class="user-info">
        <div class="user-profile" style="background-color: #0097FF">
            <img src="../assets/img/userImg/yhtx02.png" alt="头像" class="avatar" />
            <h1 style="color: white">
                {{ userInfo.name }}
            </h1>
            <h4 style="color: white;margin-left: 70px">
                <i class="el-icon-phone"/>{{ userInfo.phoneNumber }}
            </h4>
        </div>
        <div class="info-section">
            <div class="info-item">
                <i class="el-icon-location"></i> <p>我的地址</p>
            </div>
            <div class="info-item">
                <i class="el-icon-star-on"></i> <p>收藏</p>
            </div>
            <div class="info-item">
                <i class="el-icon-money"></i> <p>优惠券</p>
            </div>
            <div class="info-item">
                <i class="el-icon-user"></i> <p>客服</p>
            </div>
        </div>

        <div class="wallet-section">
            <span style="font-size: 20px;font-weight: bold">我的钱包</span>
            <span style="margin-left: 50vw">进入钱包<i class="el-icon-arrow-right"/></span>
            <div class="wallet-item balance-section" style="margin-top: 4vw">
                <span class="balance">余额: {{ wallet.balance }}</span>
            </div>
        </div>

        <!-- 底部 -->
        <Footer></Footer>
    </div>
</template>

<script>
import Footer from "@/components/Footer";

export default {
    name:'UserInfo',
    components: {
        Footer
    },
    data() {
        return {
            userInfo: {
                name: 'zzw',
                phoneNumber: '15877712345',
                avatar: "../assets/img/sj01.png",
            },
            wallet: {
                balance: 1000,
            },
        };
    },
};
</script>

<style>
.user-info {
    background-color: #f5f5f5;
    padding: 3px;
    border-radius: 5px;
}

.user-profile {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
}

.avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-right: 20px;
}

.info-section {
    background-color: white;
    border-radius: 5px;
    padding: 10px;

    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
}

.info-item {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.info-item i {
    font-size: 24px;
    margin-bottom: 2px;
    color: #0097FF;
}

.wallet-section {
    background-color: white;
    border-radius: 5px;
    padding: 10px;

    margin-top: 2px;
}

.wallet-section h3 {
    margin-bottom: 10px;
}

.wallet-item {
    margin-bottom: 10px;
}

.balance-section {
    /*background-color: #e0e0e0;*/
    padding: 10px;
    border-radius: 5px;
}

.balance {
    font-weight: bold;
}
</style>
