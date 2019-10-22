<!-- 个人中心页面 -->
<template>
<div id="Personal">
    <v-header :title="title"></v-header>
    <div class="personals" v-cloak>
        <van-row>
            <van-col span="8">
                <div class="van-col-div">
                    <span style="color:white;">余额</span>
                    <br />
                    <span style="color:yellow;">{{ formatPrice(balance) }}</span>
                    <br />
                    <span class="van-col-div-pay">充值</span>
                </div>
            </van-col>
            <van-col span="8">
                <div style="text-align:center">
                    <van-image :src="tximg" show-loading size="5" fit="cover" round height="70px" width="70px">
                        <template v-slot:loading>
                            <van-loading type="spinner" />
                        </template>
                    </van-image>
                    <div class="van-ellipsisTX" style="font-size:1.0em;">{{Username}}</div>
                    <div class="van-ellipsisTX">[铜牌会员]</div>
                </div>
            </van-col>
            <van-col span="8">
                <div class="van-col-div">
                    <span style="color:white;">积分</span>
                    <br />
                    <span style="color:yellow;">{{integral }}</span>
                    <br />
                    <span class="van-col-div-pay">兑换</span>
                </div>
            </van-col>
        </van-row>
    </div>
    <van-cell icon="records" title="我的订单" is-link value="查看全部订单" @click="IconClick(0)" :info="YfhInfo" />
    <van-row class="user-links">
        <van-col span="6">
            <van-icon name="pending-payment" :info="FkInfo" @click="IconClick(1)" />待付款
        </van-col>

        <van-col span="6">
            <van-icon name="tosend" :info="FhInfo" @click="IconClick(2)" />待发货
        </van-col>
        <van-col span="6">
            <van-icon name="logistics" :info="YfhInfo" @click="IconClick(3)" />待收货
        </van-col>
        <van-col span="6">
            <van-icon name="cash-back-record" :info="YfhInfo" @click="IconClick(4)" />退换货
        </van-col>
    </van-row>
    <van-cell-group>
        <van-cell icon="pending-payment" title="我的钱包" is-link to="Wallet" />
        <van-cell icon="send-gift-o" title="收货地址" is-link to="AddressList" />
        <van-cell icon="balance-pay" title="我的券票" is-link :coupons="coupons" :chosen-coupon="chosenCoupon" @click="showList=true" />
        <van-cell title="免费开店" icon="shop-o" is-link />
        <van-cell icon="question-o" title="获取帮助" is-link to="Help" />
        <van-cell icon="setting-o" title="我的设置" is-link to="Setup" />
    </van-cell-group>
    <!-- 优惠券列表 -->
    <van-popup v-model="showList" position="bottom">
        <van-coupon-list :coupons="coupons" :chosen-coupon="chosenCoupon" :disabled-coupons="disabledCoupons" @change="onChange" @exchange="onExchange" close-button-text="关闭" />
    </van-popup>
    <v-footer></v-footer>
</div>
</template>

<script>
var coupon = {
    available: 1,
    condition: "满50可用",
    reason: "",
    value: 150,
    name: "优惠券名称",
    startAt: 1499904000,
    endAt: 1514592000,
    valueDesc: "20",
    unitDesc: "元"
};

import Header from "../Header.vue";
import Footer from "../Footer.vue";
import {
    Row,
    Col,
    Icon,
    Cell,
    CellGroup
} from "vant";
export default {
    data() {
        return {
            title: "个人中心",
            FkInfo: "",
            JdInfo: "",
            FhInfo: "",
            YfhInfo: "",
            showList: false,
            Username: '',
            balance: '0', //余额
            integral: '0', //积分
            chosenCoupon: -1,
            coupons: [coupon],
            disabledCoupons: [coupon],
            tximg: this.global.defaultIp + "/shoppingHT/TXimg/" + sessionStorage.getItem("token") + ".png",

        };
    },
    methods: {
        formatPrice() {
            return (this.balance / 100).toFixed(2);
        },
        IconClick(datas) {
            this.$router.push({
                name: "Orders",
                params: {
                    actives: datas
                }
            }); //组件传递参数
        },
        onChange(index) {
            if (index == "-1") {
                this.showList = false;
            }
        },
        onExchange(code) {
            this.coupons.push(coupon);
        }
    },
    components: {
        [Row.name]: Row,
        [Col.name]: Col,
        [Icon.name]: Icon,
        [Cell.name]: Cell,
        [CellGroup.name]: CellGroup,
        "v-footer": Footer,
        "v-header": Header
    },
    mounted() {
        if (!sessionStorage.getItem("token")) {
            this.$router.push("login");
        }
        if (!sessionStorage.getItem('user') || !sessionStorage.getItem('much') || !sessionStorage.getItem('integral')) {
            this.$axios.post(this.global.ip + '/GetUser', 'token=' + sessionStorage.getItem('token')).then(data => {
                sessionStorage.setItem('much', data.data[0].much);
                sessionStorage.setItem('integral', data.data[0].integral);
                this.Username = sessionStorage.getItem('user');
                this.integral = sessionStorage.getItem('integral');
                this.balance = sessionStorage.getItem('much')
            })
        } else {
            this.Username = sessionStorage.getItem('user');
            this.integral = sessionStorage.getItem('integral');
            this.balance = sessionStorage.getItem('much');
        }
    }
};
</script>

<style>
.van-col-div {
    text-align: center;
    padding-top: 20px;
    line-height: 1.5em;
}

.van-col-div-pay {
    color: white;
    border: 1px solid white;
    padding: 0 15px;
    border-radius: 10px;
}

.user-poster {
    width: 100%;
    height: 53%;
    display: block;
}

.user-links {
    padding: 15px 0;
    font-size: 12px;
    text-align: center;
    background-color: #fff;
}

.user-links .van-icon {
    font-size: 24px;
    display: block;
}

.van-info {
    right: 30px;
}

.van-ellipsisTX {
    line-height: 1.5em;
    color: white;
}

.personals {
    width: 100%;
    overflow: hidden;
    border-radius: 0 0 300px 300px / 0 0 20px 20px;
    background: linear-gradient(90deg, #c200ea, #3a31c1);
    min-height: 90px;
    padding-top: 5px;
    margin-bottom: 10px;
}
</style>
