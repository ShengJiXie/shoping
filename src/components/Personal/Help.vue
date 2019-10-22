<!----帮助---->
<template>
<div id="Help">
    <v-header :title="title"></v-header>
    <van-collapse v-model="activeNames">
        <van-collapse-item title="账号登不上怎么办？" name="1">砸了</van-collapse-item>
        <van-collapse-item title="手机号无法修改？" name="2">请联系客服</van-collapse-item>
        <van-collapse-item title="商家不发货怎么办？" name="3">在订单页面有催发货功能若已催发商家仍未发货，在三天之内将对商家进行处罚。</van-collapse-item>
    
    </van-collapse>
</div>
</template>

<script>
import Header from '../Chat/Header.vue';
export default {
    data() {
        return {
            title: "帮助",
            activeNames: ['0'],
        }
    },
    components: {
        'v-header': Header
    }
}
</script>
