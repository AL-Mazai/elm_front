<template>
    <div class="wrapper">
        <div class="header-title">
            <p>我的地址</p>
        </div>

        <div class="address-page">
            <div class="address-list">
                <!-- 使用 v-for 渲染地址列表 -->
                <div v-for="(address, index) in addressInfo" :key="index" class="address-row">
                    <div class="address-item">
                        <div class="address-info">
                            <h3>{{ address.address }}</h3>
                            <p>{{ address.contactname }}  , {{ address.contacttel }}</p>
                        </div>
                        <div class="button-group">
                            <el-button type="primary" size="small" @click="editAddress(index)">
                                <i class="el-icon-edit"></i>编辑
                            </el-button>
                            <el-button type="danger"  size="small" @click="deleteAddress(index)">
                                <i class="el-icon-delete"></i>删除
                            </el-button>
                        </div>
                    </div>
                </div>
            </div>
            <el-button type="primary" @click="addAddress" class="add-button">
                <i class="el-icon-circle-plus-outline"></i>添加地址
            </el-button>
        </div>

        <!-- 底部 -->
        <Footer></Footer>
    </div>
</template>

<script>
import Footer from "@/components/Footer";

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Address",
    components: {
        Footer
    },
    data() {
        return {
            addressInfo: [],
        }
    },
    created() {
        this.getAddressInfo()
    },
    methods: {
        //获取我的所有地址
        getAddressInfo() {
            this.axios.get("http://localhost:8082/address/getAllAddress/", {
                params: {
                    userId: 3
                }
            }).then(res => {
                // console.log(res.data)
                this.addressInfo = res.data
            })
        },
        //增加地址
        addAddress() {

        },
        // 编辑地址
        editAddress(index) {
            console.log(index)
        },
        // 删除地址
        deleteAddress(index) {
            console.log(index)
        },
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
.header-title {
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

/*!****************** 地址展示部分 ******************!*/
.address-page {
    margin-top: 12vw;
    padding: 5px;
    background-color: #f8f8f8;
}

.address-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.address-row {
    width: 100%;
    margin-bottom: 5px;
}

.address-item {
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    position: relative
    /*border: solid red 1px;*/
}

.address-info {
    margin-bottom: 5px;
}

.address-info p{
    color: #8c8c8c;
    /*font-size: 20px;*/
}

.button-group {
    position: absolute; /* 让 button-group 成为绝对定位的容器 */
    bottom: 1vw; /* 将 button-group 定位到底部 */
    right: 1vw; /* 将 button-group 定位到右侧 */

    /*display: flex;*/
    /*justify-content: space-between;*/
}

/*button {*/
/*    background-color: #007bff;*/
/*    color: #fff;*/
/*    border: none;*/
/*    padding: 5px 10px;*/
/*    border-radius: 3px;*/
/*    cursor: pointer;*/

/*    margin-right: 1vh;*/
/*}*/

/*button:hover {*/
/*    background-color: #0056b3;*/
/*}*/

.add-button {
    width: 100%;

    font-size: 5vw;
    background-color: #4caf50;
    /*color: #fff;*/
    border: none;
    padding: 15px 20px;

    border-radius: 3px;
    cursor: pointer;

    /*position: fixed;*/
    /*bottom: 20px;*/
    /*right: 20px;*/
}

.add-button:hover {
    background-color: #45a049;
}
</style>
