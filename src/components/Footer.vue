<!-- 站点首页底部 -->
<template>
  <div id="footer">
    <van-tabbar v-model="active" :route="true">
      <van-tabbar-item icon="home-o" to="home">首页</van-tabbar-item>
      <van-tabbar-item icon="search" to="classification">分类</van-tabbar-item>
      <van-tabbar-item icon="shopping-cart-o"  to="Cart">购物车</van-tabbar-item>
      <van-tabbar-item icon="setting-o" to="Personal">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: 0
    };
  },
  methods: {}
};
</script>
<style >
  #footer{
height: 50px;
  }
</style>