<template>
    <div class="login-container">
        <!--表单部分-->
        <div class="title">
            <p class="title-font">用户登录</p>
        </div>
        <div class="login-box">
            <div class="select-login">
                <el-radio-group v-model="loginMethod">
                    <el-radio-button label="username">用户名登录</el-radio-button>
                    <el-radio-button label="phone">验证码登录</el-radio-button>
                </el-radio-group>
            </div>

            <el-form
                :model="loginForm"
                :rules="rules"
                ref="loginForm"
                label-width="80px"
                style="margin-right: 10vw"
            >
                <el-form-item
                    label="手机号码"
                    prop="phone"
                    v-if="loginMethod === 'phone'"
                >
                    <el-input
                        v-model="loginForm.phone"
                        type="tel"
                        placeholder="请输入手机号码"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    label="用户名"
                    prop="username"
                    v-if="loginMethod === 'username'"
                >
                    <el-input
                        v-model="loginForm.username"
                        placeholder="请输入用户名"
                    ></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input
                        v-model="loginForm.password"
                        type="password"
                        placeholder="请输入密码"
                        show-password
                    ></el-input>
                </el-form-item>
                <el-form-item style="margin-right: 5vw">
                    <el-button
                        type="primary"
                        class="login-btn"
                        @click="login('loginForm')"
                    >登录
                    </el-button>
                    <el-button
                        type="primary"
                        class="login-btn"
                        @click="$router.push('/register')"
                    >去注册
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import {userLogin} from '../api/user.js'
import {setToken} from '@/utils/auth'
import {setExpire} from '@/utils/localStorage'

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Login',
    data() {
        return {
            loginMethod: 'username', // 默认选择手机号码登录
            loginForm: {
                phone: '',
                username: '', // 添加用户名字段
                password: '',
            },
            rules: {
                phone: [
                    {required: true, message: '请输入手机号码', trigger: 'blur'},
                    {
                        pattern: /^1[3456789]\d{9}$/,
                        message: '请输入正确的手机号码',
                        trigger: 'blur',
                    },
                ],
                username: [
                    {required: true, message: '请输入用户名', trigger: 'blur'},
                ],
                password: [{required: true, message: '请输入密码', trigger: 'blur'}],
            },
        }
    },
    methods: {
        login(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (this.loginMethod === 'username') {
                        // 处理用户名登录逻辑
                        const {username, password} = this.loginForm
                        //后端登录认证
                        userLogin(username, password).then((response) => {
                            // console.log(response)
                            // 登录成功记录token和用户信息，登录失败给对应提示
                            setToken(response.token)
                            // 存储用户信息
                            // localStorage.setItem("userInfo",JSON.stringify(response.userInfoVo))
                            let validTime = 1000 * 60 * 60 * 24 //用户存储在localStorage期限为1天
                            setExpire('userInfo', response.userInfoVo, validTime)

                            this.$router.push({path: '/'})
                            this.$message.success({
                                message: '登录成功',
                                duration: 800,
                            })
                        }).catch(() => {})
                    } else if (this.loginMethod === 'phone') {
                        // 处理手机号码登录逻辑
                        const {phone, password} = this.loginForm
                        console.log('手机号码登录：', phone, password)
                    }
                } else {
                    this.$message.warning({
                        message:"请填写正确的用户名和密码",
                        duration: 1000
                    })
                }
            })
        },
    },
}
</script>

<style scoped>
.login-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f8f8f6;
    min-height: 100vh;
}

.title {
    width: 100%;
    height: 12vw;
    text-align: center;
    margin-left: 5vw;
    margin-right: 5vw;
    margin-bottom: 6vw;
    background-color: #0097ff;
}

.title-font {
    margin-top: 3vw;
    color: white;
    font-size: 4.8vw;
}

.login-box {
    margin-top: 20vw;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
    background-color: #fff;
}

.select-login {
    text-align: center;
    width: 100%;
    height: 15vw;
    margin-top: 20px;
}

.login-btn {
    margin-left: 1vw;
    margin-top: 4vw;
    width: 90%;
}
</style>
