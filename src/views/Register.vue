<template>
    <div class="register-container">
        <!--表单部分-->
        <div class="title"><p class="title-font">用户注册</p></div>

        <div class="register-box">
            <el-form
                :model="registerForm"
                :rules="rules"
                ref="registerForm"
                label-width="80px"
                style="margin-right: 10vw"
            >
                <el-form-item label="手机" prop="phone" style="margin-top: 20px">
                    <el-input
                        v-model="registerForm.phone"
                        type="tel"
                        placeholder="请输入手机号码"
                    ></el-input>
                </el-form-item>
                <el-form-item label="用户名" prop="username" style="margin-top: 20px">
                    <el-input
                        v-model="registerForm.username"
                        type="tel"
                        placeholder="请输入用户名"
                    ></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input
                        v-model="registerForm.password"
                        type="password"
                        placeholder="请输入密码"
                        show-password
                    ></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPassword">
                    <el-input
                        v-model="registerForm.checkPassword"
                        type="password"
                        placeholder="请确认密码"
                        show-password
                    ></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="usersex">
                    <el-radio v-model="registerForm.usersex" label="1">男</el-radio>
                    <el-radio v-model="registerForm.usersex" label="0">女</el-radio>
                </el-form-item>
                <el-form-item>
                    <el-button
                        type="primary"
                        class="login-btn"
                        @click="register('registerForm')"
                    >注册
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import {userRegister} from "@/api/user";

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Register',
    data() {
        return {
            registerForm: {},
            rules: {
                phone: [
                    {required: true, message: '请输入手机号码', trigger: 'blur'},
                    {
                        pattern: /^1[3456789]\d{9}$/,
                        message: '请输入正确的手机号码',
                        trigger: 'blur',
                    },
                ],
                username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
                password: [{required: true, message: '请输入密码', trigger: 'blur'}],
                checkPassword: [{required: true, message: '请确认密码', trigger: 'blur'}],
                usersex: [{required: true, message: '性别', trigger: 'blur'}],
            },
        }
    },
    methods: {
        //注册
        register(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (this.registerForm.password === this.registerForm.checkPassword) {
                        let userInfo = {
                            phone: this.registerForm.phone,
                            username: this.registerForm.username,
                            password: this.registerForm.password,
                            usersex: this.registerForm.usersex,
                            userimg: 'http://qny.cai142857.cn/2023/09/25/492f03c9c7d249198ab364e406f2a5c6.png' //默认头像
                        }
                        //后端请求
                        userRegister(userInfo).then((res) => {
                            console.log(res)
                            this.$message.success("注册成功！")
                            this.$router.push('/login')
                        })
                    } else {
                        this.$message.error('两次密码不一致')
                    }
                } else {
                    this.$message.error("格式不正确，请重新填写！")
                    return false
                }
            })
        },
    },
}
</script>

<style scoped>
.register-container {
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

.register-box {
    margin-top: 20vw;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
    background-color: #fff;
}

.login-btn {
    margin-left: 1vw;
    margin-top: 4vw;
    width: 90%;
}
</style>
