<!----顶部组件---->
<template>
  <div id="Header">
    <van-nav-bar :title="title" @click-right="onClickRight" >
      <van-icon name="chat-o" slot="right" size="2em" info=""   />
    </van-nav-bar>
    <van-notice-bar text="站点正在开发中，若遇到BUG请联系技术人员" left-icon="volume-o" />
  </div>
</template>
<script>

export default {
  name: "Header",
  data() {
    return {};
  },
  methods: {
    onClickRight: function() {
      this.$router.push('news');
    },
  
  },
  props: ["title"]
};
</script>