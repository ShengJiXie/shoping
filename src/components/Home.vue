<!---首页组件---->
<template>
  <div id="Home">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <v-header :title="msg"></v-header>
      <v-central></v-central>
    </van-pull-refresh>
    <v-footer></v-footer>
  </div>
</template>
<script>


import Vue from "vue"; //Vue
import { Lazyload } from "vant"; //懒加载
import { Swipe, SwipeItem } from "vant"; //轮播
import { NoticeBar } from "vant"; // 公告
import { Tabbar, TabbarItem } from "vant"; //底部标签栏
import { Grid, GridItem } from "vant"; // Grid宫格
import { NavBar } from "vant"; //导航栏
import { PullRefresh } from "vant"; //下拉刷新
import { Toast } from "vant"; //轻提示
import { Divider } from "vant"; //分割线
import { Tab, Tabs } from "vant";
import { Cell, CellGroup } from "vant"; //Cell单元格
import { Field } from "vant"; //输入框
import { Button } from 'vant';  //按钮
import { Sku } from 'vant';   //商品规格
import { Image } from 'vant';
import { Card } from 'vant';
import { AddressEdit } from 'vant'; //添加地址
import { AddressList } from 'vant';  //地址管理
import { Uploader } from 'vant';   //图片上传
import { Circle } from 'vant';  //环形进度条
import { CouponCell, CouponList } from 'vant';  //优惠券
import { Collapse, CollapseItem } from 'vant';  //折叠面板
import { List } from 'vant';   //列表
import { Area } from 'vant';   //地区
import { Popup } from 'vant';
import { Tag } from 'vant';
import { Stepper } from 'vant';

Vue.use(Stepper);
Vue.use(Tag);
Vue.use(Popup);
Vue.use(Area);
Vue.use(List);
Vue.use(Collapse).use(CollapseItem);
Vue.use(CouponCell).use(CouponList);
Vue.use(Circle);
Vue.use(Uploader);
Vue.use(AddressList);
Vue.use(AddressEdit);
Vue.use(Card);
Vue.use(Image);
Vue.use(Sku);
Vue.use(Button);
Vue.use(Field);
Vue.use(Cell).use(CellGroup);
Vue.use(Tab).use(Tabs);
Vue.use(Divider);
Vue.use(Toast);
Vue.use(PullRefresh);
Vue.use(NavBar);
Vue.use(Swipe).use(SwipeItem);
Vue.use(Tabbar).use(TabbarItem);
Vue.use(Lazyload);
Vue.use(NoticeBar);
Vue.use(Grid).use(GridItem);

import Header from "./Header.vue";
import Central from "./Central.vue";
import Fotter from "./Footer.vue";
export default {
  data() {
    return {
      msg: "首页",
      isLoading: false
    };
  },
  components: {
    "v-header": Header,
    "v-central": Central,
    "v-footer": Fotter
  },
  methods: {
    onRefresh: function() {
      // 页面刷新
      setTimeout(() => {
        this.$toast("刷新成功");
        this.isLoading = false;
      }, 500);
    },
     
  }
};
</script>

