<template>
    <div class="footer">
        <div> <i class="fa fa-home"></i> <p>首页</p> </div>
        <div> <i class="fa fa-compass"></i><p>发现</p> </div>
        <div> <i class="fa fa-file-text"></i> <p>订单</p> </div>
        <div> <i class="fa fa-user-o"></i><p>我的</p> </div>
    </div>
</template>

<script>
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Footer"
}
</script>

<style scoped>
/****************** 底部样式 ******************/
.footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 60px;
    background-color: #f5f5f5;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    z-index: 999;
}

.footer div {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.footer i {
    font-size: 24px;
    margin-bottom: 5px;
    color: #888;
}

.footer p {
    font-size: 12px;
    color: #888;
    margin: 0;
}
</style>