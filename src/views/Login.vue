<template>
    <div class="login-container">
        <!--表单部分-->
        <div class="title">
            <p class="title-font">用户登录</p>
        </div>
        <div class="select-login">
            <el-radio-group v-model="loginMethod" >
                <el-radio-button label="username" >用户名登录</el-radio-button>
                <el-radio-button label="phone" >验证码登录</el-radio-button>
            </el-radio-group>
        </div>

        <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="80px" style="margin-right: 10vw;">
            <el-form-item label="手机号码" prop="phone" v-if="loginMethod === 'phone'">
                <el-input v-model="loginForm.phone" type="tel" placeholder="请输入手机号码"></el-input>
            </el-form-item>
            <el-form-item label="用户名" prop="username" v-if="loginMethod === 'username'">
                <el-input v-model="loginForm.username" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="loginForm.password" type="password" placeholder="请输入密码" show-password></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" class="login-btn" @click="login('loginForm')">登录</el-button>
                <el-button type="primary" class="login-btn" @click="$router.push('/register')">去注册</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import {userLogin} from '../api/user.js'
import {setToken} from "@/utils/auth";

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Login",
    data() {
        return {
            loginMethod: "username", // 默认选择手机号码登录
            loginForm: {
                phone: "",
                username: "", // 添加用户名字段
                password: ""
            },
            rules: {
                phone: [
                    { required: true, message: "请输入手机号码", trigger: "blur" },
                    { pattern: /^1[3456789]\d{9}$/, message: "请输入正确的手机号码", trigger: "blur" }
                ],
                username: [
                    { required: true, message: "请输入用户名", trigger: "blur" }
                ],
                password: [
                    { required: true, message: "请输入密码", trigger: "blur" }
                ]
            }
        };
    },
    methods: {
        login(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    if (this.loginMethod === "username") {// 处理用户名登录逻辑
                        const { username, password } = this.loginForm;
                        //后端登录认证
                        userLogin(username, password).then((response) => {
                            console.log(response)
                            // 登录成功记录token和用户信息，登录失败给对应提示
                            setToken(response.token)
                            // 存储用户信息
                            localStorage.setItem("userInfo",JSON.stringify(response.userInfoVo))

                            if(localStorage.getItem('logUrl')){
                                this.$router.push({path:localStorage.getItem('logUrl')});
                            }else{
                                this.$router.push({path:'/'});
                            }

                            this.$message.success("登录成功")
                        })
                    } else if (this.loginMethod === "phone") {// 处理手机号码登录逻辑
                        const { phone, password } = this.loginForm;
                        console.log("手机号码登录：", phone, password);
                    }
                } else {
                    console.log("表单验证失败");
                    return false;
                }
            });
        },
    }
}
</script>

<style scoped>
.login-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.title {
    width: 100%;
    height: 12vw;

    text-align: center;

    margin-left: 5vw;
    margin-right: 5vw;
    margin-bottom: 6vw;

    background-color: #0097FF;
}

.title-font{
    margin-top: 3vw;
    color: white;
    font-size: 4.8vw;
}

.select-login{
    text-align: center;
    /*border: solid 1px red;*/
    width: 100%;
    height: 15vw;
}

.login-btn {
    margin-left: 1vw;
    margin-top: 4vw;
    width: 90%;
}

</style>
