<!-- 内容部分、站点中部 -->
<template>
<div id="Central">

    <van-swipe :autoplay="4000" class="wdisp">
        <van-swipe-item v-for="(image, index) in images" :key="index">
            <img v-lazy="image" />
        </van-swipe-item>
    </van-swipe>
    <van-grid class="gridImg">
        <van-grid-item icon="http://wx.18ek.cn/attachment/images/7/2019/05/omLuNMINiIkmwllFtLuFmkqC1SIsi2.png" text="充值查询" />
        <van-grid-item icon="http://wx.18ek.cn/attachment/images/7/2019/05/D6kV6ZmvpPuM8aj3xVAzAn4awPUwcK.png" text="代理加盟" />
        <van-grid-item icon="http://wx.18ek.cn/attachment/images/7/2019/07/W33f2QZrq1gaa22Rq3QGsq70Arr1b2.png" text="人人农场" />
        <van-grid-item icon="http://wx.18ek.cn/attachment/images/7/2019/05/hJVJXbzkBHjjE04z33vzv433LlzvY4.png" text="卡板批发" />
    </van-grid>
    <van-divider :style="{ color: '#ec3d5d', fontWeight: 'bold', borderColor: '#ec3d5d', padding: '0 16px' }">{{commodity}}</van-divider>

    <van-grid :column-num="2" :border="false" gutter="5" clickable >
        <van-grid-item v-for="(grids,index) in DataGrid" :key="index" :to="'Shoping/'+grids.id">
            <van-image :src="global.imgUrl+grids.imgUrl">
                <template v-slot:loading>
                    <van-loading type="spinner" size="20" />
                </template>
            </van-image>
            <div class="Grids" >
                <span>{{grids.title}}</span>
            </div>
        </van-grid-item>
    </van-grid>
</div>
</template>

<script>
export default {
    name: "Central",
    data() {
        return {
            show: false, //搜索栏开关
            value: "", //搜索栏内容
            showError: false, //搜索栏非法格式
            DataGrid: [],
            images: [
                //轮播图图片
                "//gw.alicdn.com/imgextra/i4/130/O1CN01Oyo1YN1Cpa369W2in_!!130-0-lubanu.jpg",
                "//gw.alicdn.com/imgextra/i3/854063/O1CN01m4KRnf1fstm7u4tMI_!!854063-0-lubanu.jpg",
                "//gw.alicdn.com/imgextra/i4/40637/O1CN01kKsiYK1GZmr0FdvJ2_!!40637-0-lubanu.jpg",
                "//gw.alicdn.com/imgextra/i2/1426901/O1CN01DOq0m020qhoFWl0kO_!!1426901-0-lubanu.jpg"
            ],
            commodity: "热门推荐" //分割线 内容
        };
    },
    methods: {
        onAxios() {
            // 商品数据
            this.$axios.get(this.global.ip + "/Hsp_commodity").then(data => {
                this.DataGrid = data.data.comdity.original;
            });
        }
    },
    mounted() {
        this.onAxios();
    }
};
</script>

<style>
.van-grid-item__icon {
    font-size: 70px;
}

.wdisp img {
    width: 100%;
    height: 190px;
}
.van-grid> .van-image__img , .van-grid-item__content > .van-image{
    height: 190px;
    width: 100%;
}
.Grids>span {
    /* white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    width: 168px;
    max-width: 100%;
     */
    height: 1.7rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    font-size: 0.65rem;
    line-height: 0.9rem;
}

.van-icon__image {
    width: 0.7em;
}
</style>
