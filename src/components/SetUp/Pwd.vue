<!---密码修改------>
<template>
<div id="Pwd">
    <v-header :title="title"></v-header>
    <van-field v-model="value" placeholder="请输入新密码" label="新密码" :type="PassWordLine" :right-icon="RightCon" @click-right-icon="RightCion" />
    <van-field v-model="value1" placeholder="再次确认密码" label="重复密码" :type="PassWordLine" />
    <van-button color="linear-gradient(to right, #4bb0ff, #6149f6)" :loading="Loading"  size="large" @click="ButtonClick">修改</van-button>
</div>
</template>

<script>
import Header from "../Chat/Header.vue";
import md5 from "js-md5";
export default {
    data() {
        return {
            title: "密码修改",
            Loading: false,
            value: "",
            value1: "",
            PassWordLine: 'password',
            RightCon: "closed-eye"
        };
    },
    methods: {
        ButtonClick() {

            if (!this.value || !this.value1 || this.value != this.value1) {
                this.$toast("密码不正确");
            } else {
                this.Loading = true;
                var md5PWD = md5(this.value);
                this.$axios.post(this.global.ip + "/upPWD", "data=" + md5PWD + "&&token=" + sessionStorage.getItem('token') + "&&type=pwd")
                    .then(data => {
                        if (data.data == true) {
                            sessionStorage.removeItem('token');
                            this.$toast("修改成功,请重新登录");
                            this.$router.push("/login");
                        } else {
                            this.$toast("修改失败");
                        }
                        console.log(data);
                    })
                    .catch(error => {
                        console.log(error);
                        this.$toast("非法错误");
                    });
            }
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
        }
    },
    components: {
        "v-header": Header
    }
};
</script>
