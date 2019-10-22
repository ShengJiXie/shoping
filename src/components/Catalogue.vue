<!--子分类-->
<template>
<div id="Catalogue">
    <v-header :title="title+'的搜索结果'"></v-header>

    <van-search v-model="values" placeholder="请输入搜索关键词" show-action shape="round" @search="onvalue">
        <div slot="action" @click="onSearch(values)">搜索</div>
    </van-search>
    <van-dropdown-menu>
        <van-dropdown-item v-model="value" :options="option" />
        <van-dropdown-item title="筛选" ref="item">
            <van-switch-cell v-model="switch1" title="包邮" />
            <van-switch-cell v-model="switch2" title="团购" />
            <van-button block type="info" @click="onConfirm">确认</van-button>
        </van-dropdown-item>
    </van-dropdown-menu>
    <div id="ShopingS" style="position:fixed;background:white;width:100%;height:100%;top: 0; z-index:999;transition: .8s all;">
        <van-loading size="40px" text-size="20px" style="position:fixed;top:50%;left:50%;margin-left:-64px;margin-top:-150px;">加载中...</van-loading>
    </div>
    <div v-if="imgs!=false">
        <van-card v-for="(img, index) in imgs" :key="index" :price="formatPrice(img.price)" :desc="img.describes" @click="RouterGet(img.id)" :title="img.title" :thumb="global.imgUrl+img.imgUrl" lazy-load v-lazy="img">
            <div slot="bottom">
                <van-col span="3" v-if="img.freight=='包邮'">
                    <van-tag plain type="danger">包邮</van-tag>
                    <br>
                </van-col>
                <span style="color:#acadb2">{{img.shopname}}></span>
            </div>
        </van-card>
    </div>
    <div v-else>
        <div style='text-align:center;height:100%;position:relative;top: 150px;'> <img style='width:80px;height:80px;' src='https://img11.360buyimg.com/jdphoto/s180x179_jfs/t18916/237/2354382781/70151/524b9406/5af31111Nc6379b2f.png'><span style='display: list-item;'>暂无相关商品</span></div>
    </div>

    <v-footer></v-footer>
</div>
</template>

<script>
import Header from "./Chat/Header.vue";
import Footer from "./Footer.vue";
export default {
    data() {
        return {
            title: this.$route.query.combrand,
            show: false, //搜索栏开关
            values: "", //搜索栏内容
            showError: false, //搜索栏非法格式
            value: 0,
            keyvalue: '',
            switch1: false,
            switch2: false,
            imgs: [],
            option: [{
                    text: "全部商品",
                    value: 0
                },
                {
                    text: "新款商品",
                    value: 1
                },
                {
                    text: "活动商品",
                    value: 2
                }
            ]
        };
    },
    methods: {
        onSearch(data) {
            // 搜索
            if (!data) {
                this.$toast('请输入内容');
            }
            this.$axios.post(this.global.ip + '/keyword', 'keyword=' + data).then(datas => {
                console.log(datas);
                if (!datas.data) {
                    this.imgs = false;
                } else {
                    this.imgs = datas.data
                    this.title = data
                }
                document.getElementById('ShopingS').style.opacity = '0';
                setTimeout(() => {
                    document.getElementById('ShopingS').style.display = 'none';
                }, 800)
              

            })

        },
        onDelect() {
            this.show = false;
            this.showError = false;
            //搜索栏取消按钮
        },
        RouterGet(data) {
            this.$router.push('Shoping/' + data);
        },
        onvalue(value) {
            // 搜索栏搜索内容
            var pattern = /^[\u4E00-\u9FA5A-Za-z0-9_]+$/;
            if (!pattern.test(value)) {
                this.showError = true;
                console.log(value);
            }
        },
        formatPrice(data) {
            //商品价格
            return (data / 100).toFixed(2);
        },
        onConfirm() {
            //   筛选
            console.log(1);
        }
    },
    mounted() {
        console.log(this.$route.query.keyword);
        
       if(this.$route.query.keyword!==undefined ){  
        this.onSearch(this.$route.query.keyword) 
    }else{
            this.$axios.post(this.global.ip + '/getcomWbrand', 'combrand=' + this.$route.query.combrand).then(data => {
                console.log(data);
                this.imgs = data.data;
                document.getElementById('ShopingS').style.opacity = '0';
                setTimeout(() => {
                    document.getElementById('ShopingS').style.display = 'none';
                }, 800)
            })
        }

    },
    components: {
        "v-header": Header,
        "v-footer": Footer
    }
};
</script>
