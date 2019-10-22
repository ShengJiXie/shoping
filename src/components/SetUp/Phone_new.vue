<!---新手机绑定---->
<template>
<div id="Phone_new">
    <v-header :title="title"></v-header>
    <van-field v-model="value" placeholder="请输入新绑定手机号" label="新手机号" left-icon="phone-o" />
    <van-field v-model="sms" center clearable label="验证码" left-icon="chat-o" placeholder="验证码" :maxlength="5" type="number">
        <van-button slot="button" size="small" type="primary">发送验证码</van-button>
    </van-field>
    <van-button color="linear-gradient(to right, #4bb0ff, #6149f6)" :loading="Loading" size="large" @click="ButtonClick">修改</van-button>

</div>
</template>

<script>
import Header from '../Chat/Header.vue';
export default {
    data() {
        return {
            title: "新手机号绑定",
            sms: '',
            Loading: false,
            value: ""
        }
    },
    methods: {
        ButtonClick() {
            this.Loading = true;
            if(this.value){
            this.$axios.post(this.global.ip + "/upPWD", "data=" + this.value + "&&token=" + sessionStorage.getItem('token') + "&&type=phone").then(data => {
                console.log(data);
                if(data.data==true){
                    this.$toast("修改成功");
                  this.$router.push("Setup");

                }else{
                    this.$toast("修改失败");
                }
            }).catch(error => {
                console.log(error);
            this.$toast("非法错误");                
                return;
            })
            }
        }
    },
    components: {
        'v-header': Header

    },
    mounted() {
        if (!sessionStorage.getItem('tokenPhone')) {
            this.$router.push('Setup');
        }
    }
}
</script>
