<!----支付密码---->
<template>
    <div id="Payment">
        <v-header :title="title"></v-header>
          <van-field v-model="value" placeholder="请输入支付密码" label="支付密码" left-icon="peer-pay" maxlength="6" />
           <van-button color="linear-gradient(to right, #4bb0ff, #6149f6)" :loading="Loading"  size="large" @click="ButtonClick">修改</van-button>
    </div>
</template>
<script>
import md5 from 'js-md5';
import Header from  '../Chat/Header.vue';
export default {
    data(){
        return{
            title:"设置支付密码",
              Loading: false,
               value: "",
        }
        
    },methods: {
         ButtonClick() {
            this.Loading = true;            
            if(this.value&&this.value.length==6){
                var md5s
                this.$axios.post(this.global.ip + "/upPWD", "data=" + this.value + "&&token=" + sessionStorage.getItem('token') + "&&type=paypwd").then(data=>{
                    if(data.data==true){
                    this.$toast("设置成功");
                  this.$router.push("Setup");
                    }else{
                    this.$toast("设置失败");
                    }
                }).catch(error=>{
                    console.log(error);
                    this.$toast("非法错误");                    
                    return;
                })
            }else{
                    this.$toast("格式错误");
            this.Loading = false;

            }
        }
    },
    components:{
        'v-header':Header
    }

    
}
</script>