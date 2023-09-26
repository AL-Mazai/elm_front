<template>
    <div class="wrapper">
        <div class="header-title">
            <div
                style="margin-top: 2.5vw; font-size: 7vw; margin-right: 34vw"
                @click="$router.push('/userInfo')"
            >
                <el-icon>
                    <ArrowLeft/>
                </el-icon>
            </div>
            <div style="margin-top: 3.5vw; font-size: 5vw">我的地址</div>
        </div>

        <div class="address-page">
            <div class="address-list">
                <!-- 使用 v-for 渲染地址列表 -->
                <div
                    v-for="(address, index) in addressInfo"
                    :key="index"
                    class="address-row"
                >
                    <div class="address-item">
                        <div class="address-info">
                            <h3>{{ address.address }}</h3>
                            <p>{{ address.contactname }} , {{ address.contacttel }}</p>
                        </div>
                        <div class="button-group">
                            <el-button
                                type="primary"
                                size="small"
                                @click="editAddress(index)"
                            >
                                <i class="el-icon-edit"></i>编辑
                            </el-button>
                            <!-- 删除地址确认-->
                            <el-popconfirm
                                title="您确定要删除吗?"
                                confirm-button-text="确认"
                                cancel-button-text="取消"
                                @confirm="deleteAddress(index)"
                            >
                                <template #reference>
                                    <el-button type="danger" size="small">
                                        <i class="el-icon-delete"></i>删除
                                    </el-button>
                                </template>
                            </el-popconfirm>
                        </div>
                    </div>
                </div>
            </div>
            <el-button type="primary" @click="addAddressVisible = true" class="add-button">
                <el-icon style="margin-right: 5px">
                    <CirclePlus/>
                </el-icon>
                新增收获地址
            </el-button>
        </div>

        <!--新增地址框-->
        <el-dialog
            v-model="addAddressVisible"
            title="新增地址"
            width="80%"
        >
            <el-form :model="addAddressForm" ref="editFormRef" label-width="80px">
                <el-form-item label="联系人" prop="contactname">
                    <el-input v-model="addAddressForm.contactname"></el-input>
                </el-form-item>
                <el-form-item label="号码" prop="contacttel">
                    <el-input v-model="addAddressForm.contacttel"></el-input>
                </el-form-item>
                <el-form-item label="地址" prop="address">
                    <el-input v-model="addAddressForm.address"></el-input>
                </el-form-item>
            </el-form>

            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="addAddressVisible = false">取消</el-button>
                    <el-button type="primary" @click="addAddressOfUser()">确认</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>

import {getExpire} from "@/utils/localStorage";
import {addAddress, getAddressOfUser, removeAddress} from "@/api/address";

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Address',
    data() {
        return {
            addressInfo: [],
            addAddressVisible: false, //新增地址框
            addAddressForm: {},  //新增地址表单
        }
    },
    created() {
        this.getAddressList()
    },
    methods: {
        //获取用户地址列表
        getAddressList() {
            let userId = getExpire("userInfo").userid
            getAddressOfUser(userId).then((res) => {
                // console.log(res)
                this.addressInfo = res
            })
        },
        //增加地址
        addAddressOfUser() {
            let userInfo = getExpire("userInfo");
            this.addAddressForm.userid = userInfo.userid
            this.addAddressForm.contactsex = userInfo.usersex

            addAddress(this.addAddressForm).then(() => {
                this.addAddressVisible = false
                this.$message({
                    message: "增加成功！",
                    type: "success",
                    duration: 1000
                })

                this.getAddressList()
            })
        },
        // 编辑地址
        editAddress(index) {
            console.log(index)
        },
        // 删除地址
        deleteAddress(index) {
            console.log(this.addressInfo[index])
            let addressId = this.addressInfo[index].daid
            removeAddress(addressId).then(() => {
                this.$message({
                    message: "删除成功！",
                    type: "success",
                    duration: 1000
                })
                this.getAddressList()
            })
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
    position: relative;
}

.address-info {
    margin-bottom: 5px;
}

.address-info p {
    color: #8c8c8c;
}

.button-group {
    position: absolute;
    bottom: 1vw;
    right: 1vw;
}

.add-button {
    width: 100%;
    height: 13vw;

    font-size: 5vw;
    background-color: #4caf50;
    border: none;

    padding: 15px 20px;
    border-radius: 3px;

    cursor: pointer;
    position: fixed;

    bottom: 1px;
    right: 1px;
    z-index: 1000;
}

.add-button:hover {
    background-color: #45a049;
}
</style>
