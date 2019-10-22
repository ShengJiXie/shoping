<!----酷条---->
<template>
<div id="Wallet">
    <v-header :title="title"></v-header>
    <van-grid :column-num="2">
        <van-grid-item icon="balance-o" text="余额" />
        <van-grid-item icon="paid" text="银行卡" />
    </van-grid>
    <van-row  type="flex" justify="space-around"  style="margin-top: 10px;">
    <van-circle  v-model="currentRate" :rate="Lastrate" :color="gradientColor" text="上月消费占比" :speed="20" />
    <van-circle  v-model="NewcurrentRate" :rate="Newrate" :color="gradientColor" text="本月消费占比" :speed="20" />
    </van-row>
 <van-cell title="酷条" icon="cash-back-record"   value="分期付款" is-link />
</div>
</template>

<script>
import Header from '../Chat/Header.vue'
export default {
    data() {
        return {
            title: '我的钱包',
            Lastrate:50,
            Newrate:30, 
            currentRate: 0,
            NewcurrentRate:0,
            gradientColor: {
                '0%': '#3fecff',
                '100%': '#6149f6'
            }
        }
    },
    components: {
        'v-header': Header
    }
}
</script>
