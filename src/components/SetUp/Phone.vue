<!---手机号修改-->
<template>
<div id="Phone">
    <v-header :title="title"></v-header>
    <van-cell-group>
    <van-cell title="验证手机号" is-link value="138****9636"  />
        <van-field v-model="sms" center clearable label="短信验证码" left-icon="chat-o" placeholder="请使用旧手机号接受验证码" :maxlength="5" type="number">
            <van-button slot="button" size="small" type="primary">发送验证码</van-button>
        </van-field>
    </van-cell-group>
    <van-button color="linear-gradient(to right, #4bb0ff, #6149f6)" :loading="Loading" :loading-text="LogingText" size="large" @click="ButtonClick">修改</van-button>

</div>
</template>

<script>
import md5 from "js-md5";
import Header from "../Chat/Header.vue";
export default {
    data() {
        return {
            title: "手机号修改",
            value: '',
            sms: '',
            LogingText: '正在修改',
            Loading: false,
        };
    },
    methods: {
        ButtonClick() {
            if(this.sms==""||this.sms==null){
                this.$toast('请填写验证码');
                return false;
            }
            this.Loading = true;

             var token=md5(this.sms);
                console.log(token);
                this.$toast("验证成功");
            this.$router.push('Phone_new');
                sessionStorage.setItem('tokenPhone',token);
        }
    },
    components: {
        "v-header": Header
    }
};
</script>
