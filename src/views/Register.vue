<template>
    <div class="register-container">
        <!--表单部分-->
        <div class="title"><p class="title-font">用户注册</p></div>
        <el-form :model="registerForm" :rules="rules" ref="registerForm" label-width="80px" style="margin-right: 10vw;">
            <el-form-item label="手机" prop="phone">
                <el-input v-model="registerForm.phone" type="tel" placeholder="请输入手机号码"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="registerForm.password" type="password" placeholder="请输入密码" show-password></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPassword">
                <el-input v-model="registerForm.checkPassword" type="password" placeholder="请确认密码" show-password></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="sex">
                <el-radio v-model="registerForm.sex" label="1">男</el-radio>
                <el-radio v-model="registerForm.sex" label="0">女</el-radio>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" class="login-btn" @click="register('registerForm')">注册</el-button>
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
            registerForm: {
                phone: '',
                password: '',
                checkPassword:'',
                sex:'',
            },
            rules: {
                phone: [
                    { required: true, message: '请输入手机号码', trigger: 'blur' },
                    { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ],
                checkPassword: [
                    { required: true, message: '请确认密码', trigger: 'blur' }
                ],
                sex: [
                    { required: true, message: '性别', trigger: 'blur' }
                ],
            }
        };
    },
    methods: {
        //注册
        register(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    if(this.registerForm.password === this.registerForm.checkPassword){
                        // 在这里处理注册逻辑
                        console.log('表单验证通过');
                        console.log(this.form)
                        this.$router.push('/login')
                    }else{
                        this.$message.error("两次密码不一致")
                    }
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