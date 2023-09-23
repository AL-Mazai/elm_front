<template>
  <div class="wrapper">
    <!-- header部分 -->
    <header>
      <div>商家列表</div>
      <div style="margin-left: 5vw">
        <el-button type="success" @click="addBusiness">增加</el-button>
      </div>
    </header>

    <!--商家列表-->
    <div class="business">
      <li v-for="business in BusinessInfos" :key="business.businessId">
        <div class="business-img">
          <img :src="business.logoUrl" @click="$router.push('/businessInfo')" />
          <div class="business-img-quantity">{{ business.other }}</div>
        </div>
        <div class="business-info">
          <h3>{{ business.name }}</h3>
          <p>
            &#165;{{ business.starPrice }}起送 | &#165;{{
              business.deliveryPrice
            }}配送
          </p>
          <p>{{ business.businessExplain }}</p>
          <el-button
            size="mini"
            type="danger"
            @click="deleteBusiness(business.businessId)"
            >删除</el-button
          >
        </div>
      </li>
    </div>

    <!-- 空白div -->
    <div>&nbsp;&nbsp;&nbsp;</div>

    <!-- 底部菜单部分 -->
    <Footer></Footer>

    <!--增加工具对话框-->
    <el-dialog
      title="添加商家"
     :visible="addDialogVisible"
      width="95%"
      :close-on-click-modal="false"
    >
      <el-form :model="businessForm" style="width: 80%" label-width="60px">
        <el-form-item label="名称">
          <el-input
           v-modle="businessForm.name"
            placeholder="请输入名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="起送费">
          <el-input
           v-modle="businessForm.starPrice"
            placeholder="请输入起送费"
          ></el-input>
        </el-form-item>
        <el-form-item label="配送费">
          <el-input
           v-modle="businessForm.deliveryPrice"
            placeholder="请输入配送费"
          ></el-input>
        </el-form-item>
        <el-form-item label="介绍">
          <el-input
           v-modle="businessForm.businessExplain"
            placeholder="请输入介绍"
          ></el-input>
        </el-form-item>
        <el-form-item label="logo">
          <el-upload
            class="avatar-uploader"
            action="http://localhost:8085/qiniu/image"
            :show-file-list="false"
            :on-success="handleLogoSuccess"
            :before-upload="beforeLogoUpload"
          >
            <img v-if="imageUrl != ''" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>

      <template v-slot:footer>
        <span class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm()">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import Footer from '@/components/Footer'

export default {
  name: 'BusinessList',
  components: { Footer },
  data() {
    return {
      businessForm: {
        name: '',
        starPrice: '',
        deliveryPrice: '',
        businessExplain: '',
        logoUrl: '',
        other: Math.floor(Math.random() * 5) + 1,
      },
      addDialogVisible: false,
      imageUrl: '',
      BusinessInfos: [],
    }
  },
  created() {
    this.getAllBusinessInfo()
  },
  methods: {
    //增加商家
    addBusiness() {
      this.addDialogVisible = true
    },
    //图片回显
    handleLogoSuccess(res) {
      this.imageUrl = res
    },
    //图片上传大小限制
    beforeLogoUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isLt2M
    },
    //提交表单
    submitForm() {
      this.businessForm.logoUrl = this.imageUrl
      console.log(this.businessForm)
      this.axios
        .post(
          'http://localhost:8085/businessInfo/addBusinessInfo',
          this.businessForm
        )
        .then((res) => {
          this.$message.success(res.data)
          this.addDialogVisible = false
          this.businessForm = {}
          this.getAllBusinessInfo()
        })
        .catch((err) => {
          this.$message.error(err.response.data)
        })
    },
    //获取商家列表
    getAllBusinessInfo() {
      this.axios
        .get('http://localhost:8085/businessInfo/getAllBusinessInfo')
        .then((res) => {
          this.BusinessInfos = res.data
        })
    },
    //删除商家
    deleteBusiness(id) {
      this.axios
        .delete('http://localhost:8085/businessInfo/deleteBusiness', {
          params: {
            businessId: id,
          },
        })
        .then((res) => {
          this.$message.success(res.data)
          this.getAllBusinessInfo()
        })
    },
  },
}
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  border: 1px solid #8c939d;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.wrapper {
  width: 100%;
  height: 100%;
}
.wrapper header {
  width: 100%;
  height: 12vw;
  background-color: #0097ff;
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
.wrapper .business {
  width: 100%;
  margin-top: 12vw;
  margin-bottom: 14vw;
}
.wrapper .business li {
  width: 100%;
  box-sizing: border-box;
  padding: 2.5vw;
  border-bottom: solid 1px #ddd;
  user-select: none;
  cursor: pointer;
  display: flex;
  align-items: center;
}
.wrapper .business li .business-img {
  position: relative;
}
.wrapper .business li .business-img img {
  width: 20vw;
  height: 20vw;
}
.wrapper .business li .business-img .business-img-quantity {
  width: 5vw;
  height: 5vw;
  background-color: red;
  color: #fff;
  font-size: 3.6vw;
  border-radius: 2.5vw;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: -1.5vw;
  top: -1.5vw;
}
.wrapper .business li .business-info {
  margin-left: 3vw;
}
.wrapper .business li .business-info h3 {
  font-size: 3.8vw;
  color: #555;
}
.wrapper .business li .business-info p {
  font-size: 3vw;
  color: #888;
  margin-top: 2vw;
}
</style>
