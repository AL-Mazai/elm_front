<template>
    <div class="user-info">
        <div class="user-profile" style="background-color: #0097FF">
            <img src="../assets/img/userImg/avatar.png" alt="头像" class="avatar" />
            <h2 style="color: white">
                {{ userInfo.username }}
            </h2>
            <h4 style="color: white;margin-left: 50px;margin-top: 30px">
                <i class="el-icon-phone"/>{{ userInfo.phone }}
            </h4>
        </div>
        <div class="info-section">
            <div class="info-item" @click="$router.push('/address')">
                <i class="el-icon-location"></i> <p>我的地址</p>
            </div>
            <div class="info-item">
                <i class="el-icon-star-on"></i> <p>收藏</p>
            </div>
            <div class="info-item">
                <i class="el-icon-money"></i> <p>优惠券</p>
            </div>
            <div class="info-item">
                <i class="el-icon-user"></i> <p>商家入驻</p>
            </div>
        </div>

        <div class="wallet-section">
            <span style="font-size: 20px;font-weight: bold">我的钱包</span>
            <span style="margin-left: 50vw">进入钱包<i class="el-icon-arrow-right"/></span>
            <div class="wallet-item balance-section" style="margin-top: 4vw">
                <span class="balance">余额: {{ userInfo.money }}</span>
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
            userInfo: {},
        };
    },
    created() {
        this.getUserInfo()
    },
    methods:{
        getUserInfo(){
            let userId = 3
            this.axios.get(`http://localhost:8081/user/${userId}`).then(res => {
                // console.log(res.data)
                this.userInfo = res.data
            })
        }
    }
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
    padding: 5px;

    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
}

.info-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 150px; /* 根据您的需要调整宽度 */
    height: 75px; /* 根据您的需要调整高度 */
    background-color: #fff; /* 背景颜色 */
    border-radius: 10px; /* 边框圆角 */
    text-align: center;
    padding: 10px;
    transition: box-shadow 0.3s, transform 0.3s; /* 过渡效果 */

    /* 默认状态下的阴影效果 */
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}

/* 鼠标悬停时的样式 */
.info-item:hover {
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.4); /* 鼠标悬停时的阴影效果 */
    transform: scale(1.05); /* 鼠标悬停时的凸显效果 */
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
