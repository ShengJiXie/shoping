<!-- 分类页面 -->
<template>
<div id="classification">
    <v-header :title="titles"></v-header>
    <van-search v-model="values" placeholder="请输入搜索关键词" show-action shape="round" @search="onvalue">
        <div slot="action" @click="onSearch">搜索</div>
    </van-search>
    <van-sidebar v-model="activeIndex">
        <van-sidebar-item :title="item.type" v-for="item in itemLeft" :key="item[0]" @click="RightDataAxios(item.type)" />
    </van-sidebar>
    <van-tree-select>
        <template slot="content">
            <van-col v-for="item in itemRight" :key="item[0]" style="float:left;padding:2px" @click="TreeRight(item.combrand)">
                <div style="width:80px;text-align:center;">
                    <van-image :src="global.imgUrl+item.brandlogo" height="60px" width="80px" />
                    <span>{{item.combrand}}</span>
                </div>
            </van-col>
        </template>
    </van-tree-select>
    <v-footer></v-footer>
</div>
</template>

<script>
import Header from "./Header.vue";
import Footer from "./Footer.vue";
import {
    Sidebar,
    SidebarItem
} from "vant";
export default {
    name: "classification",
    data() {
        return {
            activeKey: 0,
            titles: "分类",
            activeIndex: 0,
            itemLeft: [],
            itemRight: [],
            show: false, //搜索栏开关
            values: "", //搜索栏内容
            showError: false, //搜索栏非法格式
        };
    },
    methods: {
        onSearch: function () {
            if (!this.values) {
                this.$toast('请输入内容');
            }
            this.$router.push('Catalogue?keyword=' + this.values);

        },
        onDelect: function () {
            this.show = false;
            this.showError = false;
            //搜索栏取消按钮
        },
        onvalue: function (value) {
            // 搜索栏搜索内容
            var pattern = /^[\u4E00-\u9FA5A-Za-z0-9_]+$/;
            if (!pattern.test(value)) {
                this.showError = true;
                console.log(value);

            }
            // undetermined
        },
        TreeSelect: function (e) {
            this.activeIndex = e;
            console.log(this.activeIndex);
        },
        TreeRight(datas) {
            // 获取分类点击内容
            this.$router.push('Catalogue?combrand=' + datas);
            console.log(datas);

        },
        AxiosData() {
            if (!sessionStorage.getItem('left')) {

                this.$axios.get(this.global.ip + '/Hsp_commodity').then(data => {
                    this.itemLeft = data.data.comtype.original;
                    sessionStorage.setItem('left', JSON.stringify(this.itemLeft));
                })
            } else {
                this.itemLeft = JSON.parse(sessionStorage.getItem('left'));
                console.log(this.itemLeft);
            }
        },
        RightDataAxios(data) {
            this.$axios.post(this.global.ip + '/getbrand', 'type=' + data).then(datas => {

                this.itemRight = datas.data;
                console.log(datas);
            })
        }
    },
    components: {
        "v-header": Header,
        "v-footer": Footer
    },
    mounted() {
        this.AxiosData();
        this.RightDataAxios('热门品牌');
    }
};
</script>

<style>
.van-grid-item__icon {
    font-size: 60px;
}

.van-sidebar {
    float: left;
}

.van-grid {
    transition: all 0.8s;
}

span {
    font-family: sans-serif !important;
}

.van-tree-select__nav {
    display: none;
}
</style>
