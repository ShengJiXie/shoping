<!-- 聊天消息页面 -->
<template>
<div id="News">
    <v-header :title="title"></v-header>
    <van-cell-group>
        <van-cell :title="item.touser"  class="lins" value-class="height:50px" 	:value="item.state"  :label="item.title" v-for="(item, index) in PanelData" :key="index" :icon="global.defaultIp+'/shoppingHT/TXimg/'+item.image" :clickable="true"  :to="'/Chat/'+item.touser" />
    </van-cell-group>
    <v-footer></v-footer>
</div>
</template>

<script>
import Header from "./Header.vue";
import Footer from "./Footer.vue";
export default {
    name: "News",
    data() {
        return {
            title: "消息",
            Panel: 0,
            PanelData: []
        };
    },
    methods: {
        PanelClick: function (e) {},
    },
    components: {
        "v-header": Header,
        "v-footer": Footer
    },
    mounted() {
        if (!sessionStorage.getItem('token')) {
            this.$router.push('login');
        }
      
        this.$axios.post(this.global.ip + '/GetChatListB', 'user_name=' + sessionStorage.getItem('user')).then(data => {
            this.PanelData=data.data;
            console.log(this.PanelData);
            
        })
        
    }

};
</script>

<style>
.van-cell__label {
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: 200px;
    overflow: hidden;
}

.van-panel__header-value {
    color: #969799;
}
.lins .van-icon__image{
    width: 60px;
    height: 60px;
    
}
.lins .van-icon__image img{
    border-radius: 100px;
background-size: 100%;
    object-fit: inherit !important;

}
.lins {
    height: 90px;
}
</style>
