<template>
    <div class="wrapper">
        <!-- 顶部 -->
        <header>
            <div class="location-text">
                <el-icon style="margin-left: 2vw">
                    <LocationFilled/>
                </el-icon>
                云南大学呈贡校区力行楼
                <el-icon>
                    <CaretBottom/>
                </el-icon>
            </div>
        </header>

        <!-- 搜索框 -->
        <div class="search">
            <div class="search-input">
                <input type="text" placeholder="请输入要查询的商品..."/>
                <button type="submit" @click="searchPro()">搜索</button>
            </div>
        </div>

        <!-- 点餐类型 -->
        <div class="businessType">
            <div
                v-for="businessType in businessTypeList"
                :key="businessType.id"
                class="businessTypeItem"
                @click="getAllBusinessOfType(businessType)"
            >
                <img :src="businessType.typeImg"/>
                <p>{{ businessType.typeName }}</p>
            </div>
        </div>

        <!-- 横幅广告 -->
        <div class="banner">
            <h3 class="h3Title" style="margin-bottom: 1.2vw">品质套餐</h3>
            <p class="bannerText" style="margin-bottom: 2.4vw">搭配齐全吃得好</p>
            <a class="linkText">立即抢购 &gt;</a>
        </div>

        <!-- 超级会员部分 -->
        <div class="supermember">
            <div class="left">
                <img src="../assets/img/super_member.png"/>
                <h3>超级会员</h3>
                <p>&#8226; 每月享超值权益</p>
            </div>
            <div class="right">立即开通 &gt;</div>
        </div>

        <!-- 推荐商家部分 -->
        <div class="recommend">
            <div class="recommend-line"></div>
            <p>推荐商家</p>
            <div class="recommend-line"></div>
        </div>

        <!-- 推荐方式部分 -->
        <div class="recommendType">
            <div>
                <p>综合排序 <i class="fa fa-caret-down"></i></p>
            </div>
            <el-radio-group v-model="sortWay">
                <el-radio :label="1" @click="getBusinessList(1)">销量最高</el-radio>
                <el-radio :label="2" @click="getBusinessList(2)">评分最高</el-radio>
            </el-radio-group>
            <div>
                <p>筛选<i class="fa fa-filter"></i></p>
            </div>
        </div>

        <!-- 推荐商家列表部分 -->
        <div class="business">
            <li
                v-for="business in businessList"
                :key="business.businessId"
                @click="getBusinessInfo(business)"
            >
                <img :src="business.businessImg"/>
                <div class="business-info">
                    <div class="business-info-h">
                        <h3>{{ business.businessName }}</h3>
                    </div>
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
                    <div class="business-info-delivery">
                        <p>&#165;{{ business.starPrice }}起送 | &#165;{{ business.deliveryPrice }}配送</p>
                        <p>3.22km | 30分钟</p>
                    </div>
                    <div class="business-info-explain">
                        <div>{{ business.businessIntroduction }}</div>
                    </div>

                    <!--                    <div class="business-info-promotion">-->
                    <!--                        <div class="business-info-promotion-left">-->
                    <!--                            <div class="business-info-promotion-left-incon">新</div>-->
                    <!--                            <p>饿了么新用户首单立减9元</p>-->
                    <!--                        </div>-->
                    <!--                        <div class="business-info-promotion-right">-->
                    <!--                            <p>2个活动</p>-->
                    <!--                            <i class="fa fa-caret-down"></i>-->
                    <!--                        </div>-->
                    <!--                    </div>-->
                    <!--                    <div class="business-info-promotion">-->
                    <!--                        <div class="business-info-promotion-left">-->
                    <!--                            <div-->
                    <!--                                class="business-info-promotion-left-incon"-->
                    <!--                                style="background-color: #f1884f"-->
                    <!--                            >-->
                    <!--                                特-->
                    <!--                            </div>-->
                    <!--                            <p>特价商品5元起</p>-->
                    <!--                        </div>-->
                    <!--                    </div>-->
                </div>
            </li>
        </div>

        <!-- 空白div -->
        <div>&nbsp;&nbsp;&nbsp;</div>

        <!-- 底部 -->
        <Footer></Footer>
    </div>
</template>

<script>
import Footer from '../components/Footer'
import {getAllType, getAllBusiness} from "@/api/business";

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'index',
    components: {
        Footer,
    },
    data() {
        return {
            businessTypeList: [], //商家类型列表
            businessList: [],  //商家列表
            sortWay: 1,  //商家列表排序方法，默认为按销量排序
        }
    },
    created() {
        this.getAllBusinessType()
        this.getBusinessList(this.sortWay)
    },
    methods: {
        searchPro() {
            alert('hello')
        },
        //获取商家类型列表
        getAllBusinessType() {
            getAllType().then((res) => {
                // console.log('@', res)
                this.businessTypeList = res
            })
        },
        //获取商家列表(按销量最高)
        getBusinessList(sortWay) {
            getAllBusiness(sortWay).then((res) => {
                // 将带有一位小数的数字字符串转为数字
                this.businessList = res.map((business) => ({
                    ...business,
                    stars: parseFloat(business.stars).toFixed(1), // 将保留一位小数的字符串再次转为浮点数
                }));
            });
        },
        //跳转到商家页面
        getBusinessInfo(business){
            // console.log(business)
            this.$router.push({
                name:'BusinessInfo',
                query: business,
            })
        },
        //按类型跳转到商家列表
        getAllBusinessOfType(type){
            this.$router.push({
                name:'BusinessList',
                query: type
            })
        }
    },
}
</script>

<style scoped>
.wrapper {
    width: 100%;
    height: 100%;
}

.wrapper header {
    background-color: #0097ff;
    display: flex;
    width: 100%;
    height: 12vw;
    align-items: center;
}

.wrapper header .location-text {
    color: white;
    font-size: 4.5vw;
    font-weight: bold;
}

.wrapper .search {
    width: 100%;
    height: 13vw;
}

.wrapper .search .search-input {
    margin-top: 1vw;
    display: flex;
    align-items: center;
    margin-left: 1vw;
    margin-right: 1vw;
}

.wrapper .search input[type='text'] {
    padding: 10px;
    border-radius: 25px;
    border: none;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
    flex: 1;
}

.wrapper .search button[type='submit'] {
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 10px;
    border-radius: 25px;
    margin-left: 10px;
    cursor: pointer;
}

.wrapper .businessType {
    width: 100%;
    height: 48vw;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
}

.wrapper .businessType .businessTypeItem {
    display: flex;
    flex-direction: column;

    height: 20vw;
    width: 18vw;

    justify-content: center;
    align-items: center;
    cursor: pointer;

}

.wrapper .businessType .businessTypeItem img {
    width: 12vw;
    height: 10.3vw;
}

.wrapper .businessType .businessTypeItem p {
    font-size: 4vw;
    color: #666;
}

.wrapper .banner {
    width: 95vw;
    height: 29vw;
    margin-left: 2.5vw;
    box-sizing: border-box;
    background-image: url(../assets/img/index_banner.png);
    background-repeat: no-repeat;
    background-size: cover;
    padding: 2vw 6vw;
}

.wrapper .supermember {
    width: 95vw;
    height: 11.5vw;
    margin-left: 2.5vw;
    margin-top: 1.3vw;
    background-color: #feedc1;
    border-radius: 2px;
    color: #644f1b;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.wrapper .supermember .left {
    display: flex;
    align-items: center;
    margin-left: 4vw;
    user-select: none;
}

.wrapper .supermember .left img {
    width: 6vw;
    height: 6vw;
    margin-right: 2vw;
}

.wrapper .supermember .left h3 {
    font-size: 4vw;
    margin-right: 2vw;
}

.wrapper .supermember .left p {
    font-size: 3vw;
}

.wrapper .supermember .right {
    font-size: 3vw;
    margin-right: 4vw;
    cursor: pointer;
}

.wrapper .recommend {
    width: 100%;
    height: 20vw;
    display: flex;
    justify-content: center;
    align-items: center;
}

.wrapper .recommend-line {
    width: 35%;
    height: 2px;
    background-color: #ccc;
}

.wrapper .recommend p {
    margin: 0 2vw;
    font-size: 6vw;
    font-weight: bold;
}

.wrapper .recommendType {
    width: 100%;
    height: 8vw;
    margin-bottom: 5vw;
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.wrapper .recommendType p {
    font-size: 3.8vw;
    color: #555;
}

.wrapper .business {
    width: 100%;
    margin-bottom: 14vw;
}

.wrapper .business li {
    width: 100%;
    box-sizing: border-box;
    padding: 2.5vw;
    user-select: none;
    border-bottom: solid 1px #ddd;
    display: flex;
}

.wrapper .business li img {
    width: 18vw;
    height: 18vw;
}

.wrapper .business li .business-info {
    width: 100%;
    box-sizing: border-box;
    padding-left: 3vw;
}

.wrapper .business li .business-info .business-info-h {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2vw;
}

.wrapper .business li .business-info .business-info-h h3 {
    font-size: 4vw;
    color: #333;
}

.wrapper .business li .business-info .business-info-h .business-info-like {
    width: 1.6vw;
    height: 3.4vw;
    background-color: #666;
    color: #fff;
    font-size: 4vw;
    margin-right: 4vw;
    display: flex;
    justify-content: center;
    align-items: center;
}

.wrapper .business li .business-info .business-info-star {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2vw;
    font-size: 3.1vw;
}

.wrapper
.business
li
.business-info
.business-info-star
.business-info-star-left {
    display: flex;
    align-items: center;
}

.wrapper
.business
li
.business-info
.business-info-star
.business-info-star-left
p {
    color: #666;
    margin-left: 1vw;
}

.wrapper
.business
li
.business-info
.business-info-star
.business-info-star-right {
    background-color: #0097ff;
    color: #fff;
    font-size: 2.4vw;
    border-radius: 2px;
    padding: 0 0.6vw;
}

.wrapper .business li .business-info .business-info-delivery {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2vw;
    color: #666;
    font-size: 3.1vw;
}

.wrapper .business li .business-info .business-info-explain {
    display: flex;
    align-items: center;
    margin-bottom: 3vw;
}

.wrapper .business li .business-info .business-info-explain div {
    border: solid 1px #ddd;
    font-size: 2.8vw;
    color: #666;
    border-radius: 3px;
    padding: 0 0.1vw;
}

.wrapper .business li .business-info .business-info-promotion {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.8vw;
}

.wrapper
.business
li
.business-info
.business-info-promotion
.business-info-promotion-left {
    display: flex;
    align-items: center;
}

.wrapper
.business
li
.business-info
.business-info-promotion
.business-info-promotion-left
.business-info-promotion-left-incon {
    width: 4vw;
    height: 4vw;
    background-color: #70bc46;
    border-radius: 3px;
    font-size: 3vw;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
}

.wrapper
.business
li
.business-info
.business-info-promotion
.business-info-promotion-left
p {
    color: #666;
    font-size: 3vw;
    margin-left: 2vw;
}

.wrapper
.business
li
.business-info
.business-info-promotion
.business-info-promotion-right {
    display: flex;
    align-items: center;
    font-size: 2.5vw;
    color: #999;
}

.wrapper
.business
li
.business-info
.business-info-promotion
.business-info-promotion-right
p {
    margin-right: 2vw;
}
</style>
