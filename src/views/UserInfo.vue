<template>
    <div class="user-info">
        <div v-if="isLogin" class="user-profile" style="background-color: #0097FF">
            <img :src="userInfo.userimg" alt="头像" class="avatar" @error="handleAvatarError" />
            <div style="width:100%;">
                <div style="width:100%;color: white;font-size: 21px;">
                    {{ userInfo.username }}
                </div>
                <div style="width:100%;color: white;font-size: 18px;margin-top: 10px;">
                    {{ formatPhoneNumber(userInfo.phone) }}<i class="el-icon-edit" style="margin-left: 5px"/>
                </div>
            </div>
        </div>
        <div v-else class="user-profile" style="background-color: #0097FF">
            <img src="../assets/img/userImg/avatar.png" alt="头像" class="avatar" />
            <h2 style="color: white" @click="$router.push('/login')">
                登录
            </h2>
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
            <span style="margin-left: 50vw" @click="$router.push('/money')">进入钱包<i class="el-icon-arrow-right"/></span>
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
// import {userInfo} from "@/api/user";

export default {
    name:'UserInfo',
    components: {
        Footer
    },
    data() {
        return {
            userInfo: {},
            isLogin: false,
            //固定头像链接
            defaultAvatar: "http://s0k2fu3j0.hn-bkt.clouddn.com/image/1.png"
        };
    },
    created() {
        this.getUserInfo()
    },
    methods:{
        //获取用户信息
        getUserInfo(){
            if(localStorage.getItem("userInfo")){
                this.userInfo = JSON.parse(localStorage.getItem("userInfo"))
                this.isLogin = true
            }else{
                this.$message.warning({
                    message: "请先登录",
                    duration: 800
                })
            }
        },
        //头像加载失败
        handleAvatarError(){
            this.userInfo.userimg = this.defaultAvatar
        },
        //将电话号码一部分替换为*
        formatPhoneNumber(phone) {
            const visibleDigits1 = phone.substring(0, 3); // 前6位可见
            const visibleDigits2 = phone.substring(8, 10); // 前6位可见
            const hiddenDigits = phone.substring(4, 7).replace(/\d/g, "*"); // 后面的数字替换为 *
            return `${visibleDigits1}${hiddenDigits}${visibleDigits2}`;
        }
    }
};
</script>

<style scoped>
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
