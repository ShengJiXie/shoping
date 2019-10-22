<!---订单页面---->
<template>
<div id="Orders">
    <v-header :title="title"></v-header>

    <van-tabs v-model="active" @click="TabClick(active)">
        <van-tab title="全部">
            <div v-html="NoSp" v-if="!condition"></div>
                <van-list v-else v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <van-card  lazy-load  v-for="item in list" :key="item"   num="1" desc="2XL 条款纹" title="海威特（Havit）I39蓝牙耳机运动无线跑步入耳式耳塞 双耳立体声重低音手机开车耳麦 超小迷你磁吸 绅士黑" thumb="//img10.360buyimg.com/mobilecms/s337x337_jfs/t1/55113/21/8437/142131/5d5e07b0e23e409d5/ae9b5dacfd90859a.jpg!q70.dpg.webp">
                <span slot="bottom">实付金额: <span class="Price">¥59.90</span> </span>
                <div slot="footer">
                    <van-button size="mini" class="ButtonSize" v-if="condition==='1'">再次购买</van-button>
                    <van-button size="mini" class="ButtonSize" v-else>立即评价</van-button>
                    <van-button size="mini" class="ButtonSize">查看订单</van-button>
                </div>
            </van-card>
               </van-list>
        </van-tab>
        <van-tab title="待付款">
            <div v-html="NoSp" v-if="!condition"></div>
                <van-list v-else v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <van-card  lazy-load   v-for="item in list" :key="item"  num="1" desc="酷铄金属(USB3.0)，32GB" title="闪迪（SanDisk）32GB USB3.0 U盘 CZ73酷铄 银色 读速150MB/s 金属外壳 内含安全加密软件" thumb="//img10.360buyimg.com/mobilecms/s337x337_jfs/t27418/220/1076778584/139009/d1c59b46/5bc055acne61cff61.jpg!q70.dpg.webp">
                <span slot="bottom">待付金额: <span class="Price">¥49.90</span> </span>
                <div slot="footer">
                    <van-button size="mini" class="ButtonSize" >修改订单</van-button>
                    <van-button size="mini" class="ButtonSize">立即付款</van-button>
                </div>
            </van-card>
               </van-list>

        </van-tab>
        <van-tab title="待发货">
            <div v-html="NoSp" v-if="!condition"></div>
                <van-list v-else v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <van-card  lazy-load  v-for="item in list" :key="item"  num="1" desc="2XL 条款纹" title="雅鹿男士内裤男95%棉平角裤衩时尚条纹中腰四角短裤男式底裤男平角内裤 条纹款4条装 L" thumb="https://img.yzcdn.cn/vant/t-thirt.jpg">
                <span slot="bottom">实付金额: <span class="Price">¥50</span> </span>
                <div slot="footer">
                    <van-button size="mini" class="ButtonSize">申请退款</van-button>
                    <van-button size="mini" class="ButtonSize">催发商家</van-button>
                </div>
            </van-card>
                </van-list>
        </van-tab>
        <van-tab title="待收货">
            <div v-html="NoSp" v-if="condition"></div>
                <van-list v-else v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <van-card  lazy-load  v-for="item in list" :key="item"  num="1" desc="2XL 条款纹" title="雅鹿男士内裤男95%棉平角裤衩时尚条纹中腰四角短裤男式底裤男平角内裤 条纹款4条装 L" thumb="https://img.yzcdn.cn/vant/t-thirt.jpg">
                <span slot="bottom">实付金额: <span class="Price">¥50</span> </span>
                <div slot="footer">
                    <van-button size="mini" class="ButtonSize">查看物流</van-button>
                    <van-button size="mini" class="ButtonSize">申请售后</van-button>
                    <van-button size="mini" class="ButtonSize">确认收货</van-button>
                </div>
            </van-card>
                </van-list>
        </van-tab>
        <van-tab title="退换货">
            <div v-html="NoSp" v-if="condition"></div>
                <van-list v-else v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <van-card  lazy-load  v-for="item in list" :key="item"  num="1" desc="2XL 条款纹" title="雅鹿男士内裤男95%棉平角裤衩时尚条纹中腰四角短裤男式底裤男平角内裤 条纹款4条装 L" thumb="https://img.yzcdn.cn/vant/t-thirt.jpg">
                <span slot="bottom">实付金额: <span class="Price">¥50</span> </span>
                <div slot="footer">
                    <van-button size="mini" class="ButtonSize">售后状态</van-button>
                    <van-button size="mini" class="ButtonSize">取消</van-button>
                </div>
            </van-card>
                </van-list>
        </van-tab>

    </van-tabs>

</div>
</template>

<script>
import Header from '../Chat/Header.vue';
export default {
    data() {
        return {
            title: "我的订单",
            active: this.$route.params.actives,
            condition: 1, //临时判断 栏目下是否有商品
            NoSp: "<div style='text-align:center;height:100%;position:relative;top: 150px;'> <img style='width:80px;height:80px;' src='https://img11.360buyimg.com/jdphoto/s180x179_jfs/t18916/237/2354382781/70151/524b9406/5af31111Nc6379b2f.png'><span style='display: list-item;'>暂无相关商品</span></div>",
            finished: false, //加载完成
            loading: false, //加载状态
            list:[]
        }
    },
    methods: {
        TabClick(data) { //标签栏判断
            switch (data) {
                case 0:
                    console.log('总订单');
                    break;
                case 1:
                    console.log('待付款');
                    break;
                case 2:
                    console.log("待发货");
                    break;
                case 3:
                    console.log('待收货');
                    break;
            }
        },
        onLoad() { //下拉加载
            setTimeout(() => {
                for (let index = 0; index < 7; index++) {
                this.list.push(this.list.length + 1);
                }
                this.loading = false;
                if (this.list.length >= 40) {
                    this.finished = true;
                }
            }, 800);

        }
    },
    components: {
        'v-header': Header
    }
}
</script>

<style>
.ButtonSize {
    background: red;
    color: white;
    height: 100%;
    padding: 5px 10px;
}

.Price {
    font-weight: bold;
    font-size: 1.5em;
    color: red;
}
</style>
