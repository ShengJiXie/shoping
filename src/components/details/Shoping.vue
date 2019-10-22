<!-- 商品详情页面 -->
<template>
    <div id="Shoping">

        <div id="ShopingS"
            style="position:fixed;background:white;width:100%;height:100%;z-index:999;transition: 1s all;">

            <van-loading size="40px" text-size="20px"
                style="position:absolute;top:50%;left:50%;margin-left:-64px;margin-top:-20px;">加载中...</van-loading>

        </div>

        <div>

            <v-header :title="title"></v-header>
            <van-swipe class="goods-swipe" :autoplay="3000">
                <van-swipe-item v-for="imgs in ShopIngImg" :key="imgs[0]" style="height:360px;">

                    <van-image :src="global.imgUrl+imgs.img" style="width:100%;height: 100%;"
                        @error="this.src=this.global.ip+'shoppingHT/TXimg/Undefined.jpg'" />

                </van-swipe-item>

                <van-swipe-item v-if="ShopIngImg==false">

                    <van-image :src="this.global.defaultIp+'/shoppingHT/TXimg/Undefined.jpg'"
                        style="width:100%;height:100%;">

                    </van-image>

                </van-swipe-item>

            </van-swipe>

            <van-cell-group>

                <van-cell>

                    <div class="goods-price" style="color:red;font-size:1.6em;font-weight:bold;"
                        v-html="'￥'+formatPrice(shoping.price)"></div>

                    <div class="goods-title" style="font-weight: bold;">{{ shoping.title }}</div>

                    <div class="goods-title" style="color:#9c9c9c;">{{ shoping.describes }}</div>

                </van-cell>

                <van-popup v-model="show" closeable close-icon="close" position="bottom" :style="{ height: '60%' }"
                    round>

                    <van-card :price="modemuch" :desc="content" title="库存:10" :thumb="skuimg" centered stepper-title />

                    <van-divider content-position="left">套餐类型</van-divider>

                    <van-col style="margin:5px 5px;" v-for="tabs in ShopIngImg" :key="tabs[0]">

                        <van-tag type="primary" size="large" class="van-cells" @click="TagClick(tabs)" color="#b1a8a8">
                            {{tabs.style}}</van-tag>

                    </van-col>

                    <van-col style="margin:5px 5px;float:right">

                        <van-stepper v-model="numberS" integer />

                    </van-col>



                    <van-goods-action>

                        <van-goods-action-button type="warning" text="加入购物车" @click="onClickButton()" />

                    </van-goods-action>

                </van-popup>

                <van-cell class="goods-express">

                    <van-col span="6">运费：{{ shoping.freight }}</van-col>

                    <van-col span="6">库存：{{ shoping.stock_num }}</van-col>

                    <van-col span="6">重量：{{shoping.weight+'kg'}}</van-col>

                </van-cell>

                <van-cell class="goods-express">

                    <van-col span="6">

                        正品保障

                        <van-icon :name="img" />

                    </van-col>

                    <van-col span="6">

                        30天包修

                        <van-icon :name="img" />

                    </van-col>

                    <van-col span="6">

                        自提

                        <van-icon :name="img" />

                    </van-col>

                </van-cell>

                <van-cell v-if="ShopIngImg==false" title="该商品暂时无法购买" is-link />

                <van-cell v-else :title="dataD" is-link @click="TabsClick" />

                <van-tabs v-model="active" animated swipeable sticky style="color:#c8c9cc;font-size:0.9em;">

                    <van-tab title="参数">

                        <table cellpadding="2" cellspacing="5" width="100%" border="0">

                            <tbody>

                                <tr v-for="sku in ShopNone_sku" :key="sku[0]">

                                    <td class="tdTitle">{{sku.indexes}}</td>

                                    <td>{{sku.content}}</td>

                                </tr>

                            </tbody>

                        </table>

                    </van-tab>

                    <van-tab title="承诺" style="line-height:1.2em;padding:10px">

                        {{shoping.details}}

                        <br /> {{shoping.promise}}

                    </van-tab>

                    <van-tab title="详情">
<img :src="global.imgUrl+item.img" width="100%" v-for="(item, index) in Dexq" :key="index">

                    </van-tab>

                    <van-tab title="评价">{{shoping.promise}}</van-tab>

                </van-tabs>

            </van-cell-group>

            <van-cell-group class="goods-cell-group">

                <van-cell value="进入店铺" icon="shop-o" is-link @click="sorry">

                    <template slot="title">

                        <span class="van-cell-text">{{shoping.shopname  }}</span>

                        <van-tag class="goods-tag" type="danger">自营</van-tag>
                    </template>
                </van-cell>
            </van-cell-group>

            <van-cell-group class="goods-cell-group">
                <van-cell title="查看商品详情" is-link @click="sorry" overlay-style="height:500px" />
            </van-cell-group>

            <van-goods-action style="z-index: 99;">
                <van-goods-action-icon icon="chat-o" @click="sorry">客服</van-goods-action-icon>
                <van-goods-action-icon icon="cart-o" @click="onClickCart">购物车</van-goods-action-icon>
                <van-goods-action-button type="warning" @click="TabsClick">加入购物车</van-goods-action-button>
            </van-goods-action>
        </div>
    </div>
</template>

<script>
    import {
        Tag,
        Col,
        Icon,
        Cell,
        CellGroup,
        Swipe,
        Toast,
        SwipeItem,
        GoodsAction,
        GoodsActionIcon,
        GoodsActionButton
    } from "vant";
    import Header from "../Chat/Header.vue";
    export default {
        components: {
            [Tag.name]: Tag,
            [Col.name]: Col,
            [Icon.name]: Icon,
            [Cell.name]: Cell,
            [CellGroup.name]: CellGroup,
            [Swipe.name]: Swipe,
            [SwipeItem.name]: SwipeItem,
            [GoodsAction.name]: GoodsAction,
            [GoodsActionIcon.name]: GoodsActionIcon,
            [GoodsActionButton.name]: GoodsActionButton
        },
        data() {
            return {
                goodsId: "646", //商品1ID
                show: false, //规格选择 弹窗
                title: "商品详情",
                shoping: [], //数据
                ShopIngImg: [], //轮播图
                ShopNone_sku: [], //规格
                active: 2,
                img: this.global.defaultIp + "/shoppingHT/icon/1571021512.png",
                modemuch: "0.00",
                skuimg: "", //规格缩略图
                content: "请选择规格",
                dataD: "选择规格",
                numberS: 1, //数量
                lsStorage: [],
                dec: {},
                Dexq:[]//商品详情
            };
        },
        methods: {
            onClickCart() {
                this.$router.push("cart");
            },
            TagClick(tab) {
                this.modemuch = this.formatPrice(tab.much);
                this.content = tab.style;
                this.skuimg = this.global.imgUrl + tab.img;
                this.dataD = "已选择" + tab.style;
                this.lsStorage = tab;
            },
            onClickButton() {
                //规格加入购物车
                this.show = false;
                this.dec['title'] = this.shoping.title;
                this.dec['num'] = this.numberS;
                this.dec['img'] = this.lsStorage.img;
                this.dec['much'] = this.lsStorage.much;
                this.dec['style'] = this.lsStorage.style;
                this.dec['name'] = sessionStorage.getItem('user');
                this.$axios.post(this.global.ip + '/SetShoppingCart', this.dec).then(data => {
                    if (data.data == true) {
                        this.$toast('加入购物车成功!');
                    } else {
                        this.$toast('加入购物车失败!');
                    }
                })

            },
            TabsClick(data) {
                if(sessionStorage.getItem('token')){
                    this.show = true;
                }else{
                    this.$toast('请先登录');
                    setTimeout(()=>{
                        this.$router.push('/login')
                    },1000)
                }
                // console.log(this.show);

            },
            sorry() {
                Toast("暂无后续逻辑~");
            },
            ShoPingData() {
                //调用api 获取商品数据
                var id = this.$route.params.id;
                this.$axios.get(this.global.ip + "/sp_commodity?id=" + id).then(data => {

                    
                    this.Dexq=data.data.details_img.original;
                    this.ShopIngImg = data.data.img;
                    this.shoping = data.data.details.original[0];
                    this.ShopNone_sku = data.data.introduce.original;
                    this.skuimg = this.global.imgUrl + this.ShopIngImg[0].img;

                    if (this.ShopIngImg) {
                        document.getElementById('ShopingS').style.opacity = '0';
                        setTimeout(() => {
                            document.getElementById('ShopingS').style.display = 'none';
                        }, 1000)
                    }
                });
                if (!this.ShopIngImg) {
                    this.ShopIngImg = false;
                }

            },
            formatPrice(data) {
                //商品价格
                return (data / 100).toFixed(2);
            }
        },
        components: {
            "v-header": Header
        },
        mounted() {

            this.ShoPingData();
        }
    };
</script>

<style>
    .goods {
        padding-bottom: 50px;
    }

    .van-cells:hover {
        background: red !important;
    }

    .tdTitle {
        width: 170px;
    }
</style>