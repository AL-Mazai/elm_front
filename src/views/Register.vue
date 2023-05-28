<template>
    <div class="register-container">
        <!--表单部分-->
        <div class="title"><p class="title-font">用户注册</p></div>
        <el-form :model="form" :rules="rules" ref="form" label-width="80px" style="margin-right: 10vw;">
            <el-form-item label="手机" prop="phone">
                <el-input v-model="form.phone" type="tel" placeholder="请输入手机号码"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="form.password" type="password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" class="login-btn" @click="$router.push('/login')">注册</el-button>
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
    name: "Register",
    components: {Footer},
    data() {
        return {
            form: {
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
        submitForm(formName) {
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
.register-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.title {
    width: 100%;
    height: 16vw;

    text-align: center;

    margin-left: 5vw;
    margin-right: 5vw;
    margin-bottom: 6vw;

    background-color: #0097FF;
}

.title-font{
    margin-top: 4vw;
    color: white;
    font-size: 8vw;
}

.login-btn {
    margin-left: 1vw;
    margin-top: 4vw;
    width: 90%;
}
</style>