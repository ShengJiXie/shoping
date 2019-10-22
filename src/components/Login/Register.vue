<!-- 注册页面 -->
<template>
<div id="register">
    <van-nav-bar title="注册" left-text="返回" left-arrow @click-left="onClickLeft" />
    <van-notice-bar text="站点正在开发中，若遇到BUG请联系技术人员" left-icon="volume-o" />
    <van-cell-group>
        <van-field v-model="username" required clearable label="用户名" right-icon="question-o" placeholder="请输入用户名" />
        <van-field v-model="password" type="password" label="密码" placeholder="请输入密码" required />
        <van-field v-model="reapassword" type="password" label="重复密码" placeholder="请再次输入密码" required />
        <van-field v-model="email" type="email" label="邮箱" placeholder="请输入邮箱" required />
        <van-field v-model="phone" label="手机号" placeholder="请输入手机号" required maxlength="11" />
        <van-field v-model="Verification" center clearable label="验证码" placeholder="请输入短信验证码" required>
            <van-button slot="button" size="small" type="primary">发送验证码</van-button>
        </van-field>
    </van-cell-group>
    <van-button color="linear-gradient(to right, #4bb0ff, #6149f6)" :loading="Loading" :loading-text="LogingText" size="large" @click="ButtonClick">注册</van-button>
</div>
</template>

<script>
import md5 from "js-md5";
export default {
    data() {
        return {
            username: "", //用户名
            password: "", //密码
            reapassword: "", //重复密码
            email: "", //邮箱
            phone: "", //手机号
            Verification: "", //短信验证码
            Loading: false,
            LogingText: "",
            DataTime: '' //当前时间
        };
    },
    methods: {
        onClickLeft: function () {
            this.$router.back(-1);
        },
        ButtonClick: function () {
            if (!/^[\u4E00-\u9FA5A-Za-z0-9_]+$/.test(this.username)) {
                this.$toast("用户名格式错误");
                return;
            }
            if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(this.email)) {
                this.$toast("邮箱格式错误");
                return;
            }
            if (!/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/.test(this.phone)) {
                this.$toast("手机号格式错误");
                return;
            }
            if (this.password != this.reapassword) {
                this.$toast("二次密码不一致");
                return;
            }
            this.Loading = true;
            this.LogingText = "正在注册";
            var md5pwd = md5(this.password);
            this.$axios.post(this.global.ip + '/registerdata', "name=" + this.username + "&&pwd=" + md5pwd + "&&email=" + this.email + "&&date=" + this.DataTime + "&&phone=" + this.phone + "&&reaname=''&&state=''")
                .then(res => {
                    console.log(res);
                    if (res.data == true) {
                        this.Loading = false;
                        this.$router.push("/Login");
                        this.$toast('注册成功')
                    } else {
                        this.Loading = false;
                        this.$toast('注册失败,账号或手机号或邮箱已存在');
                    }
                })
                .catch(error => {
                    this.Loading = false;
                    this.$toast('非法错误请联系管理员')
                    console.log(error);
                });

        },
        getNowFormatDate() { //日期
            var date = new Date();
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            var D = date.getDate() + ' ';
            var h = date.getHours() + ':';
            var m = date.getMinutes() + ':';
            var s = date.getSeconds();
            this.DataTime = Y + M + D + h + m + s;
        }
    },
    mounted() {
        this.getNowFormatDate();
        if (sessionStorage.getItem("token")) {
            this.$router.push("Home");
        }
    }
};
</script>
