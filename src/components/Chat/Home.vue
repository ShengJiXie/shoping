<!-- 聊天页面 -->
<template>
<div id="Home">

    <v-header :title="this.$route.params.id"></v-header>
    <div v-for="data in list" :key='data[0]'>
      <!-- <div style="text-align:center;margin:10px 0">
            <span style="color:#bab3b3;font-size:0.8em;">{{data.datetime}}</span><br>
             </div> -->
        <div class="sendmy" v-if="data.user_name==names">
            <span style="color:#373030;">{{data.chat}}</span>
            <div class="arrowmy"></div>
        </div>
        <div class="sendyou"  v-else>
            <span style="color:#373030;">{{data.chat}}</span>
            <div class="arrowyou"></div>
        </div>
    </div>

    <van-cell-group>
        <van-field v-model="value" left-icon="chat-o" placeholder="请输入内容" maxlength="150" style="width: 100%;position:fixed;bottom: 0;">
            <van-button slot="button" size="small" type="primary" @click="FieLdClick">发送</van-button>
        </van-field>
    </van-cell-group>
</div>
</template>

<script>
import Header from "./Header.vue";
export default {
    name: "Home",
    data() {
        return {
            title: "我",
            value: "",
            list: [],
           names:sessionStorage.getItem('user')
        };
    },
    methods: {

        FieLdClick: function () {
            if (!this.value) {
                this.$toast("请填写内容");
            } else {
                //发送信息
                this.$axios.post(this.global.ip + '/SetChat', 'user_name=' + sessionStorage.getItem('user') + '&&touser=' + this.$route.params.id + "&&chat=" + this.value).then(data => {
                    if (data.data == true) {
                        this.value = "";
                        this.axiosClick();
                    }
                })
            }
        },
        axiosClick() {
            this.$axios.post(this.global.ip + '/GetChat', 'user_name=' + sessionStorage.getItem('user') + '&&touser=' + this.$route.params.id).then(data => {
                this.list = data.data;
                console.log(this.list);

            })
        }, 
        //   WebSocketTest(){
        //     if ("WebSocket" in window)
        //     {
        //        alert("您的浏览器支持 WebSocket!");
               
        //        // 打开一个 web socket
        //        var ws = new WebSocket("ws://192.168.90.22:8080/Chat/aaaa");
                
        //        ws.onopen = function()
        //        {
        //           // Web Socket 已连接上，使用 send() 方法发送数据
        //           ws.send("发送数据");
        //           alert("数据发送中...");
        //        };
                
        //        ws.onmessage = function (evt) 
        //        { 
        //           var received_msg = evt.data;
        //           alert("数据已接收...");
        //        };
                
        //        ws.onclose = function()
        //        { 
        //           // 关闭 websocket
        //           alert("连接已关闭..."); 
        //        };
        //     }
            
        //     else
        //     {
        //        // 浏览器不支持 WebSocket
        //        alert("您的浏览器不支持 WebSocket!");
        //     }
        //  }
        
    },
    components: {
        "v-header": Header
    },
    mounted() {
        if (!sessionStorage.getItem('token')) {
            this.$router.push('login');
        }
        this.axiosClick();
        // this.WebSocketTest()
    }
};
</script>

<style>


.sendmy {
   position: relative;
    width: 150px;
    background: #d1d1d1;
    border-radius: 5px;
    margin: 10px 140px 0;
    float: right;
    right: -109px;
   
    padding: 10px 10px;
}

.sendmy .arrowmy {
    position: absolute;
    top: 5px;
    right: -16px;
    /* 圆角的位置需要细心调试哦 */
    width: 0;
    height: 0;
    font-size: 0;
    border: solid 8px;
    border-color: #ffffff #ffffff #ffffff #d1d1d1 ;
}

.sendyou {
   position: relative;
    width: 150px;
    background: yellow;
    border-radius: 5px;
    margin: 10px 20px 0;
    float: left;
     height: 100%;
    left: 0;
    padding: 10px 10px;
}

.sendyou .arrowyou {
    position: absolute;
    top: 5px;
    left: -16px;
    width: 0;
    height: 0;
    font-size: 0;
    border: solid 8px;
    border-color: #ffffff yellow #ffffff #ffffff ;
}
</style>
