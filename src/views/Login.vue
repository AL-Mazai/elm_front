<template>
    <div class="login-container">
        <!--表单部分-->
        <div class="title"><p class="title-font">用户登录</p></div>
        <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="80px" style="margin-right: 10vw;">
            <el-form-item label="手机" prop="phone">
                <el-input v-model="loginForm.phone" type="tel" placeholder="请输入手机号码"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="loginForm.password" type="password" placeholder="请输入密码" show-password></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" class="login-btn" @click="login('loginForm')">登录</el-button>
                <el-button type="primary" class="login-btn" @click="$router.push('/register')">去注册</el-button>
            </el-form-item>
        </el-form>

        <!--底部菜单-->
        <Footer></Footer>
    </div>
</template>

<script>
import Footer from "@/components/Footer";

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Login",
    components: {Footer},
    data() {
        return {
            loginForm: {
                phone: '',
                password: ''
            },
            rules: {
                phone: [
                    { required: true, message: '请输入手机号码', trigger: 'blur' },
                    { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        login(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    // 在这里处理登录逻辑
                    console.log('表单验证通过');
                } else {
                    console.log('表单验证失败');
                    return false;
                }
            });
        }
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
    font-size: 6vw;
}

.login-btn {
    margin-left: 1vw;
    margin-top: 4vw;
    width: 90%;
}
</style>