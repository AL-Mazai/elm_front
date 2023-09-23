<template>
  <div class="discover">
    <div class="title">
      <p class="title-font">发现</p>
    </div>

    <div class="discover-items">
      <div class="discover-item">
        <img src="../assets/其他/美团.png" alt="发现项1" class="item-image" />
        <h3 class="item-title">美团外卖</h3>
        <p class="item-description">好吃的都在这里</p>
      </div>
      <div class="discover-item">
        <img src="../assets/其他/干饭人.png" alt="发现项2" class="item-image" />
        <h3 class="item-title">呈贡干饭人</h3>
        <p class="item-description">大学生外卖专送</p>
      </div>
      <div class="discover-item">
        <img src="../assets/其他/麻辣烫.png" alt="发现项2" class="item-image" />
        <h3 class="item-title">校园麻辣烫</h3>
        <p class="item-description">好吃不上火</p>
      </div>
      <div class="discover-item">
        <img src="../assets/其他/麻辣烫.png" alt="发现项2" class="item-image" />
        <h3 class="item-title">校园麻辣烫</h3>
        <p class="item-description">好吃不上火</p>
      </div>
      <div class="discover-item">
        <img src="../assets/其他/麻辣烫.png" alt="发现项2" class="item-image" />
        <h3 class="item-title">校园麻辣烫</h3>
        <p class="item-description">好吃不上火</p>
      </div>
      <div class="discover-item">
        <img src="../assets/其他/麻辣烫.png" alt="发现项2" class="item-image" />
        <h3 class="item-title">校园麻辣烫</h3>
        <p class="item-description">好吃不上火</p>
      </div>
    </div>

    <!-- 空白div -->
    <div style="height: 20vw"></div>
    <!--底部菜单-->
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from '@/components/Footer'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Discover',
  components: { Footer },
}
</script>

<style scoped>
.discover {
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
  background-color: #0097ff;
}
.title-font {
  margin-top: 3vw;
  color: white;
  font-size: 4.8vw;
}
.discover-items {
  display: flex;
  flex-wrap: wrap;
}
.discover-item {
  margin-left: 3vw;
  margin-bottom: 4vw;
  display: flex;
  width: 170px;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background-color: #f2f2f2;
  border-radius: 20px;
  cursor: pointer;
  transition: transform 0.3s ease;
}
.discover-item:hover {
  transform: scale(1.1);
  background-color: yellow;
}
.item-image {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 10px;
}
.item-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
}
.item-description {
  font-size: 14px;
  color: #888;
}
</style>
