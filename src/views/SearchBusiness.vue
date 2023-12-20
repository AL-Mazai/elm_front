<template>
    <div class="wrapper">
        <!-- header部分 -->
        <header>
            <div>商家列表</div>
        </header>
        
        <!--商家列表-->
        <div class="business">
            <li v-for="business in businessListByName" :key="business.businessId" @click="getBusinessInfo(business)">
                <div class="business-img">
                    <img :src="business.businessImg"/>
                </div>
                <div class="business-info">
                    <h3>{{ business.businessName }}</h3>
                    <div style="color: #666;font-size: 3.1vw"> 月售{{ business.orderNum }}单</div>
                    <div class="business-info-star">
                        <div class="business-info-star-left">
                            <el-rate
                                v-model="business.stars"
                                disabled
                                show-score
                                text-color="#ff9900"
                                score-template="{value}"
                                size="small"
                                class="business-rate"
                            />
                        </div>
                        <div class="business-info-star-right">云大专送</div>
                    </div>
                    <p>
                        &#165;{{ business.starPrice }}起送 | &#165;{{
                            business.deliveryPrice
                        }}配送
                    </p>
                    <p>{{ business.businessIntroduction }}</p>
                </div>
            </li>
        </div>

        <!-- 空白div -->
        <div>&nbsp;&nbsp;&nbsp;</div>

        <!-- 底部菜单部分 -->
        <Footer></Footer>
    </div>
</template>

<script>
import Footer from '@/components/Footer'

export default {
    name: 'BusinessList',
    components: {Footer},
    data() {
        return {
            businessListByName: [],
        }
    },
    created() {
        this.businessListByName = JSON.parse(sessionStorage.getItem("searchBusiness"))
    },
    methods: {
        //跳转到商家页面
        getBusinessInfo(business){
            this.$store.commit('indexToBusinessInfo',business)
            this.$router.push('/BusinessInfo')
        },
    },
}
</script>

<style scoped>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #409eff;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
    border: 1px solid #8c939d;
}

.avatar {
    width: 178px;
    height: 178px;
    display: block;
}

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

.wrapper .business {
    width: 100%;
    margin-top: 12vw;
    margin-bottom: 14vw;
}

.wrapper .business li {
    width: 100%;
    box-sizing: border-box;
    padding: 2.5vw;
    border-bottom: solid 1px #ddd;
    user-select: none;
    cursor: pointer;
    display: flex;
    align-items: center;
}

.wrapper .business li .business-img {
    position: relative;
}

.wrapper .business li .business-img img {
    width: 20vw;
    height: 20vw;
}

.wrapper .business li .business-img .business-img-quantity {
    width: 5vw;
    height: 5vw;
    background-color: red;
    color: #fff;
    font-size: 3.6vw;
    border-radius: 2.5vw;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: -1.5vw;
    top: -1.5vw;
}

.wrapper .business li .business-info {
    margin-left: 3vw;
    width: 100%;
    box-sizing: border-box;
    padding-left: 3vw;
}

.wrapper .business li .business-info h3 {
    font-size: 3.8vw;
    color: #555;
}

.wrapper .business li .business-info p {
    font-size: 3vw;
    color: #888;
    margin-top: 2vw;
}
.wrapper .business li .business-info .business-info-star{
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin-bottom: 2vw;
    font-size: 3.1vw;
}
.wrapper .business li .business-info .business-info-star .business-info-star-left{
    align-items: center;
}

.wrapper .business li .business-info .business-info-star .business-info-star-right {
    background-color: #0097ff;
    color: #fff;
    font-size: 2.4vw;
    border-radius: 2px;
    padding: 0 0.6vw;
}

.no-business {
    display: flex; /* 使用 Flexbox 布局 */
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
    height: 80vh; /* 设置高度为视口高度，使元素占满整个屏幕 */

    font-size: 50px;
    color: #d2d2c8;
}
</style>
