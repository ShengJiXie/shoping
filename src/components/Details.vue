<!-- 订单详情页面 -->
<template>
    <div id="Details">
        <v-header :title='title'></v-header>
        <van-cell-group>
            <van-cell title="运输中" icon="logistics" label="您的商品正在运输中" center size='large' />
        </van-cell-group>

        <van-contact-card type="edit" name="张三" tel="13000000000" :editable="false" />
        <br>

        <van-card num="2" price="2.00" desc="描述信息" title="商品标题" thumb="https://img.yzcdn.cn/vant/t-thirt.jpg">
            <div slot="footer">
                <van-button size="mini">申请售后</van-button>
            </div>
        </van-card>
        <van-cell title="联系商家" icon="service-o" />
        <van-cell>
            <table style="color:rgb(197, 193, 193)">
                <tr>订单:1435135135123156</tr>
                <tr>下单时间:2019-02-26 07:42:34</tr>
                <tr>支付方式:货到付款</tr>
                <tr>配送方式:普通快递</tr>
                <tr>邮箱:1278099455@qq.com</tr>
            </table>
            <van-row>
                    <van-col span="5">商品金额:</van-col>
                    <van-col offset="15"><span style="color:red;font-weight: bold;">￥45</span></van-col>
                    <van-col span="5">运费:</van-col>
                    <van-col offset="15"><span style="color:red;font-weight: bold;">+￥55</span></van-col>
                    <van-col offset='15'><span style="font-weight:bold;font-size: 1.3em;">实付金额:</span><span style="color:red;font-weight: bold;font-size: 1.3em;">￥999</span></van-col>
                  </van-row>

        </van-cell>
        <van-goods-action>
                <van-goods-action-button type="info" text="删除订单" />
                <van-goods-action-button type="danger" text="再次购买" />
              </van-goods-action>
    </div>
</template>
<script>
    import Header from './Chat/Header.vue'
    export default {
        data() {
            return {
                title: '订单详情页面',
            }
        }, components: {
            'v-header': Header
        }
    }
</script>