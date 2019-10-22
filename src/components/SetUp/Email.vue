<template>
<div id="Email">
    <v-header :title="title"></v-header>
    <van-field v-model="value" placeholder="请输入邮箱" label="邮箱" left-icon="envelop-o" />
    <van-button color="linear-gradient(to right, #4bb0ff, #6149f6)" :loading="Loading" size="large" @click="ButtonClick">修改</van-button>
</div>
</template>

<script>
import Header from '../Chat/Header.vue'
export default {
    data() {
        return {
            title: "绑定邮箱",
            Loading: false,
            value: "",
        }
    },
    methods: {
        ButtonClick() {
  
            if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(this.value)) {
                this.$toast("邮箱格式错误");
                return;
            } else {
                          this.Loading = true;
                this.$axios.post(this.global.ip + "/upPWD", "data=" + this.value + "&&token=" + sessionStorage.getItem('token') + "&&type=email").then(data => {
                    console.log(data);
                    if (data.data == true) {
                        this.$toast("修改成功");
                        this.$router.push("Setup");
                    } else {
                        this.$toast("修改失败");
                    }
                }).catch(error => {
                    console.log(error);
                    this.$toast("非法错误");
                })
                this.Loading = false;
                this.LogingText = "修改"
            }
        }
    },
    components: {
        'v-header': Header
    }
}
</script>
