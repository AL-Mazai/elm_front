<template>
    <div class="user-info">
        <!--已登录则显示用户新-->
        <div v-if="isLogin" class="user-profile" style="background-color: #0097ff">
            <img
                :src="userInfo.userimg"
                alt="头像"
                class="avatar"
                @error="handleAvatarError"
            />
            <div style="width: 100%">
                <div style="width: 100%; color: white; font-size: 21px">
                    {{ userInfo.username }}
                </div>
                <div style="width: 100%; color: white; font-size: 18px; margin-top: 10px">
                    {{ formatPhoneNumber(userInfo.phone) }}
                </div>
            </div>
        </div>
        <!--未登录-->
        <div v-else class="user-profile" style="background-color: #0097ff">
            <img src="../assets/img/userImg/avatar.png" alt="头像" class="avatar"/>
            <h2 style="color: white" @click="$router.push('/login')">登录</h2>
        </div>

        <!--钱包-->
        <div class="wallet-section" style="position: relative">
            <span style="font-size: 20px; font-weight: bold">我的钱包</span>
            <span style="margin-left: 53vw" @click="$router.push('/money')">
                进入钱包
                <el-icon style="position: absolute; right: 1px; top: 17px">
                    <ArrowRight/>
                </el-icon>
            </span>
            <div class="wallet-item balance-section" style="margin-top: 4vw">
                <span class="balance">余额: {{ userInfo.money }}</span>
            </div>
        </div>

        <!--其他-->
        <div class="info-section">
            <div class="info-item" @click="$router.push('/address')">
                <div class="icon" style="position: relative">
                    <el-icon>
                        <Position/>
                    </el-icon>
                    <span>我的地址</span>
                    <el-icon style="position: absolute; right: 1px; top: 1px">
                        <ArrowRight/>
                    </el-icon>
                </div>
            </div>
            <hr/>
            <div class="info-item">
                <div class="icon" style="position: relative">
                    <el-icon>
                        <Star/>
                    </el-icon>
                    <span>收藏</span>
                    <el-icon style="position: absolute; right: 1px; top: 1px">
                        <ArrowRight/>
                    </el-icon>
                </div>
            </div>
            <hr/>
            <div class="info-item">
                <div class="icon" style="position: relative">
                    <el-icon>
                        <Money/>
                    </el-icon>
                    <span>优惠券</span>
                    <el-icon style="position: absolute; right: 1px; top: 1px">
                        <ArrowRight/>
                    </el-icon>
                </div>
            </div>
            <hr/>
            <div class="info-item">
                <div class="icon" style="position: relative">
                    <el-icon>
                        <User/>
                    </el-icon>
                    <span>商家入驻</span>
                    <el-icon style="position: absolute; right: 1px; top: 1px">
                        <ArrowRight/>
                    </el-icon>
                </div>
            </div>
        </div>

        <div class="logout" @click="showLogoutDialog" style="position: relative">
            <div style="font-size: 18px;position: absolute;top: 16px;left: 1px;right: 1px;">
                退出登录
            </div>
        </div>

        <!-- 弹窗 -->
        <el-dialog
            title="退出登录确认"
            v-model="logoutDialogVisible"
            width="80%"
            @close="cancelLogout"
        >
            <p>您确定要退出吗？</p>
            <template v-slot:footer>
        <span class="dialog-footer">
          <el-button @click="cancelLogout">取消</el-button>
          <el-button type="primary" @click="confirmLogout">确定</el-button>
        </span>
            </template>
        </el-dialog>

        <!-- 底部 -->
        <Footer></Footer>
    </div>
</template>

<script>
import Footer from '@/components/Footer'
import {userInfo, logout} from '@/api/user'
import {removeToken} from '@/utils/auth'

export default {
    name: 'UserInfo',
    components: {
        Footer,
    },
    data() {
        return {
            userInfo: {},
            isLogin: false,
            logoutDialogVisible: false, //退出登录确认框
            //固定头像链接
            defaultAvatar: 'http://s0k2fu3j0.hn-bkt.clouddn.com/image/1.png',
        }
    },
    mounted() {
        //获取用户信息
        userInfo()
            .then((res) => {
                // console.log('@', res)
                this.userInfo = res
                this.isLogin = true
                // console.log(this.userInfo)
            })
            .catch((err) => {
                this.$message({
                    message: '请先登录',
                    type: 'warning',
                    duration: 1000,
                })
                console.log(err)
            })
    },
    methods: {
        //退出登录确认框
        showLogoutDialog() {
            // 显示退出登录确认框
            this.logoutDialogVisible = true
        },
        cancelLogout() {
            // 取消退出登录
            this.logoutDialogVisible = false // 隐藏确认框
            // 执行取消退出登录的其他操作
        },
        //退出登录
        confirmLogout() {
            logout()
                .then(() => {
                    // console.log(res)
                    //删除cookie，删除本地用户信息，将登录状态设置为false
                    removeToken()
                    localStorage.removeItem('userInfo')
                    this.isLogin = false

                    this.$message({
                        message: '退出成功！',
                        type: 'success',
                        duration: 1000,
                    })
                })
                .catch(() => {
                    this.$message({
                        message: '您尚未登录！',
                        type: 'warning',
                        duration: 1000,
                    })
                })

            this.logoutDialogVisible = false
            this.userInfo = {}
        },
        //头像加载失败
        handleAvatarError() {
            this.userInfo.userimg = this.defaultAvatar
        },
        //将电话号码一部分替换为*
        formatPhoneNumber(phone) {
            if (phone) {
                const visibleDigits1 = phone.substring(0, 3) // 前6位可见
                const visibleDigits2 = phone.substring(8, 10) // 前6位可见
                const hiddenDigits = phone.substring(4, 7).replace(/\d/g, '*') // 后面的数字替换为 *
                return `${visibleDigits1}${hiddenDigits}${visibleDigits2}`
            }
            return '' // 处理 phone 为 undefined 的情况
        },
    },
}
</script>

<style scoped>
.user-info {
    background-color: #f2f2f2;
    border-radius: 5px;
    height: 600px;
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
    justify-content: space-between;
}

.info-item {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 40px;
    background-color: #fff;
    display: flex;
    transition: box-shadow 0.3s, transform 0.3s;
}

/*!* 鼠标悬停时的样式 *!*/
.info-item i {
    font-size: 24px;
    color: #0097ff;
}

.info-item .icon {
    display: flex; /* 使用 Flex 布局 */
    align-items: center; /* 垂直居中对齐 */

    margin-top: 10px;
}

.icon span {
    margin-left: 5px; /* 设置图标和文本之间的间距，根据需要调整 */
}

.wallet-section {
    background-color: white;
    border-radius: 5px;
    padding: 10px;
    margin-top: 2px;
    margin-bottom: 8px;
}

.wallet-section h3 {
    margin-bottom: 10px;
}

.wallet-item {
    margin-bottom: 10px;
}

.balance-section {
    padding: 10px;
    border-radius: 5px;
}

.balance {
    font-weight: bold;
}

.logout {
    background-color: white;
    margin-top: 15px;
    width: 100%;
    height: 50px;
    text-align: center;
}
</style>
