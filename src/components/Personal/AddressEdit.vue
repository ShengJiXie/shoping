<!-- 新建地址页面 -->
<template>
<div id="AddressEdit">
    <v-header :title="title"></v-header>
    <van-address-edit :area-list="areaList" show-postal show-delete show-set-default   :search-result="searchResult" @save="onSave"  @change-detail="onChangeDetail" />
</div>
</template>

<script>
import Header from '../Chat/Header.vue'
import Areas from '../Area.js'
export default {
    data() {
        return {
            title: "新增地址",
            areaList:Areas,
            searchResult: []
        }
    },
    methods: {
        onSave(content) {
            content['user_name']=sessionStorage.getItem('user');
            content['token']=sessionStorage.getItem('token');
            console.log(content);
            this.$axios.post(this.global.ip+'/SetAddress',content).then(data=>{
                console.log(data.data);
                

                if(data.data==true){
                    this.$toast('新增地址成功');
                    this.$router.push('AddressList');
                }else{
                    this.$toast('新增地址失败');     
                    return;               
                }
            })
        },

        onChangeDetail(val) {
     
            
        },

    },
    components: {
        'v-header': Header
    }

}
</script>
