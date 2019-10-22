<!----聊天顶部组件---->
<template>
<div id="Header">
    
    <van-nav-bar :title="title" left-text="返回" right-text="更多" left-arrow @click-left="onClickLeft" @click-right="onClickRight" />
    <van-notice-bar text="站点正在开发中，若遇到BUG请联系技术人员" left-icon="volume-o" />
</div>
</template>

<script>
export default {
    name: "Header",
    data() {
        return {
        };
    },
    methods: {
        onClickLeft: function () {
            this.$router.back(-1);
        },
        onClickRight() {
            this.$toast("按钮");
        }
    },
    props: ["title"]
};
</script>
