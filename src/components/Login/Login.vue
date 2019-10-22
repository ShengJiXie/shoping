<!-- 登陆页面 -->
<template>
<div id="Login">
    <van-nav-bar title="您还未登陆,请先登陆!" left-text="返回" right-text="注册" left-arrow @click-left="onClickLeft" @click-right="onClickRight" />
    <van-notice-bar text="站点正在开发中，若遇到BUG请联系技术人员" left-icon="volume-o" />
    <van-cell-group>
        <van-field v-model="loginForm.username" label="用户名" placeholder="用户名/邮箱/已认证手机" :error="FieldError" />
        <van-field v-model="loginForm.password" :type="PassWordLine" label="密码" placeholder="请输入密码" :right-icon="RightCon" @click="RightCion" />
        <van-button color="linear-gradient(to right, #4bb0ff, #6149f6)" :loading="Loading" :loading-text="LogingText" size="large" @click="ButtonClick">登陆</van-button>
    </van-cell-group>
    <van-divider>其他登陆方式</van-divider>
    <van-grid clickable :column-num="2">
        <van-grid-item icon="alipay" text="支付宝" style="color:#03a9f4;" />
        <van-grid-item icon="wechat" text="微信" style="color:#8bc34a;" />
    </van-grid>
</div>
</template>

<script>
import md5 from "js-md5";

import {
    mapMutations
} from "vuex";
export default {
    data() {
        return {
            loginForm: {
                username: "",
                password: ""
            },
            userToken: "",
            FieldError: false,
            PassWordLine: "password",
            RightCon: "closed-eye",
            Loading: false,
            LogingText: ""
        };
    },
    methods: {
        onClickLeft: function () {
            this.$router.back(-1);
        },
        onClickRight: function () {
            this.$router.push("Register"); //路由跳转
        },
        RightCion: function () {
            //密码 类型
            if (this.RightCon == "eye-o") {
                this.PassWordLine = "text";
                this.RightCon = "closed-eye";
            } else {
                this.PassWordLine = "password";
                this.RightCon = "eye-o";
            }
        },
        ButtonClick: function () {
            sessionStorage.clear();
            //登陆
            this.Loading = true;
            this.LogingText = "正在登陆";
            if (this.loginForm.username === "" || this.loginForm.password === "") {
                this.$toast("账号密码不能为空");
                this.Loading = false;
                this.LogingText = "登录";
            } else {
                var md5password = md5(this.loginForm.password);
                var md5nampwd = md5(this.loginForm.username + md5password);
                this.$axios
                    .post(
                        this.global.ip + "/logindata",
                        "name=" +
                        this.loginForm.username +
                        "&&pwd=" +
                        md5password +
                        "&&token=" +
                        md5nampwd
                    )
                    .then(data => {

                        if (data.data == true) {
                            this.$router.push("/home");
                            sessionStorage.setItem("token", md5nampwd);
                            sessionStorage.setItem("user", this.loginForm.username);
                            this.$toast("登陆成功");
                        } else {
                            this.Loading = false;
                            this.$toast("账号或密码错误");
                            this.LogingText = "登录";

                            return;
                        }
                    })
                    .catch(errors => {
                        console.log(errors);
                        this.$toast("登录失败");
                        this.LogingText = "登录";
                        this.Loading = false;
                        return;
                    });
            }
        }
    },
    mounted() {
        this.$axios.post(this.global.ip + '/tokens', "token=" + sessionStorage.getItem('token')).then(token => {
            if (token.data == false) {
                sessionStorage.removeItem('token');
                this.$router.push('login')
            } else {
                this.$router.push('home')
            }

        }).catch(error => {
            console.log("错误:" + error);
        });
    }
};
</script>
