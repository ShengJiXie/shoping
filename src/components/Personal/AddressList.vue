<!-- 管理地址 -->
<template>
<div id="AddressList">
    <v-header :title="title"></v-header>
    <van-address-list v-model="chosenAddressId"  :list="list"  @add="onAdd" @edit="onEdit" @select="ClickList" />
</div>
</template>
<script>
import Header from '../Chat/Header.vue';
export default {
    data() {
        return {
            title: "收货地址",
            chosenAddressId: '1',
            list: [],
        }
    },
    methods: {
        ClickList(item,index) {
            console.log(index)
        },
        onAdd() {
            this.$router.push('AddressEdit');
        },

        onEdit(item, index) {
            this.$axios.post(this.global.ip+'/RemoveAddress','id='+item.id+'&&token='+sessionStorage.getItem('token')).then(data=>{
                if(data.data==true){
                    this.$toast('删除收货地址成功!');
                    setTimeout(()=>{
                        location.reload(true);
                    },800)
                }else{
                    this.$toast('非法操作!');
                }
            })
        }
    },
    components: {
        'v-header': Header
    },
    mounted() {
        this.$axios.post(this.global.ip + '/GetAddress', 'user_name=' + sessionStorage.getItem('user')).then(data => {
            this.list = data.data;                
            for (var index = 0; index < this.list.length; index++) {
                if (this.list[index].Maddress == 'true') {
                    this.chosenAddressId=this.list[index].id;
                }
                // console.log(this.chosenAddressId);

            }

        })
    }
}
</script>
