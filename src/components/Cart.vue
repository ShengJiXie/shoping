<!-- 购物车 -->
<template>
<div id="Cart">
    <v-header :title="title"></v-header>
    <van-checkbox-group class="card-goods" v-model="checkedGoods" style="margin-bottom: 50px;">
        <van-checkbox class="card-goods__item" v-for="item in goods" :key="item.id" :name="item.id">
            <van-card :title="item.title" :desc="item.style" :num="item.num" :price="formatPrice(item.much)" :thumb="global.imgUrl+item.img" />
        </van-checkbox>
    </van-checkbox-group>
    <van-submit-bar :price="totalPrice" :disabled="!checkedGoods.length" :button-text="submitBarText" @submit="onSubmit" style="position:fixed" />
    <v-footer></v-footer>
</div>
</template>

<script>
import Header from './Header.vue'
import Footer from './Footer.vue'
import {
    Checkbox,
    CheckboxGroup,
    Card,
    SubmitBar,
    Toast
} from "vant";
export default {
    components: {
        [Card.name]: Card,
        [Checkbox.name]: Checkbox,
        [SubmitBar.name]: SubmitBar,
        [CheckboxGroup.name]: CheckboxGroup
    },
    data() {
        return {
            title: '购物车',
            checkedGoods: [],
            goods: []
        };
    },
    computed: {
        submitBarText() {
            var count = this.checkedGoods.length;
            return "结算" + (count ? `(${count})` : "");
        },
        totalPrice() {
            
            return this.goods.reduce((total, item) =>total + (this.checkedGoods.indexOf(item.id) !== -1 ? item.much : 0),0);
            
            
        }
    },
    methods: {
        formatPrice(price) {
            return (price / 100).toFixed(2);
        },
        onSubmit() {
            Toast("点击结算");
        }
    },
    components: {
        'v-header': Header,
        'v-footer': Footer

    },
    mounted() {
        if (!sessionStorage.getItem('token')) {
            this.$router.push('login');
        }
        this.$axios.post(this.global.ip + '/GetShoppingCart', 'name=' + sessionStorage.getItem('user')).then(data => {
            console.log(data);
            this.goods = data.data
        })
    }
};
</script>

<style>
.card-goods {
    padding: 10px 0;
    background-color: #fff;
}

.card-goods__item {
    position: relative;
    background-color: #fafafa;
}

.van-checkbox__label {
    width: 100%;
    height: auto;
    padding: 0 10px 0 15px;
    box-sizing: border-box;
}

.van-checkbox__icon {
    top: 50%;
    left: 10px;
    z-index: 1;
    position: absolute;
    margin-top: -10px;
}

.van-card__price {
    color: #f44;
}

.van-submit-bar {
    position: absolute;
    bottom: 50px;
}
</style>
