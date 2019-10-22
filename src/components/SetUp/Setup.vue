<!-- 设置页面 -->

<template>
<div id="Setup">
    <v-header :title="title"></v-header>
    <div style="text-align:center;">
        <van-uploader v-model="fileList" :max-count="1" @oversize="OverSize" :max-size="1048576" :after-read="AfterReads" :before-read="BeforeReads"></van-uploader>
    </div>
    <van-cell title="修改手机号" is-link :value="phone" to="Phone" />
    <van-cell title="账号登陆密码" is-link :value="pwdts" to="Pwd" />
    <van-cell title="账号支付密码" is-link :value="paypwds" to="Payment" />
    <van-cell title="账号绑定邮箱" is-link :value="email" to="Email" />
    <van-button type="default" size="large" color="red" text="退出登录" @click="Del()"></van-button>
</div>
</template>

<script>
import Header from "../Chat/Header.vue";
export default {
    data() {
        return {
            title: "设置",
            dataS: [],
            imgs: "",
            fileList: [
                // Uploader 根据文件后缀来判断是否为图片文件
                // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
                {
                    url: "",
                }
            ],
            phone: "",
            email: "",
            pwdts: "",
            paypwds: ""

        };
    },
    methods: {
        OverSize(data) {
            this.$toast("图片过大,上传失败");
            return false;
        },
        BeforeReads(data) {
            if (data.type == "image/png" || data.type == "image/jpg" || data.type == "image/jpeg") {
                return true;
            } else {
                this.$toast("上传失败 请上传png或jpg、jpeg图片");
                return false;
            }
        },
        AfterReads(file) {
            var content = file.content;
            var data = new FormData();
            data.append("avatar", content);
            data.append("token", sessionStorage.getItem("token"));

            this.$axios.post(this.global.ip + "/upImage", data).then(res => {
                console.log(res);
                if (res.data == true) {
                    this.$toast("上传成功");
                    location.reload(true);
                }
            });

        },
        Del() {
            sessionStorage.clear();
            this.$toast('退出成功请重新登录');
            this.$router.push('login');
        }
    },
    components: {
        "v-header": Header
    },
    mounted() {
        this.$axios
            .post(
                this.global.ip + "/GetUser",
                "token=" + sessionStorage.getItem("token")
            )
            .then(data => {
                this.dataS = data.data[0];
                this.phone = this.dataS.phone.substr(0, 3) + "****" + this.dataS.phone.substr(7); //手机号 ****
                this.email = this.dataS.email.substr(0, 4) + "****" + this.dataS.email.substr(11); //手机号 ****
                this.pwdts = "定期修改更安全"
                this.dataS.paypwds == 'null' ? this.paypwds = "未设置" : this.paypwds = "已设置";
                if (this.dataS.img == "" || this.dataS.img == null) {
                    this.dataS.img = "//img11.360buyimg.com/jdphoto/s120x120_jfs/t21160/90/706848746/2813/d1060df5/5b163ef9N4a3d7aa6.png";
                } else {
                    this.fileList[0].url = this.global.defaultIp+'/shoppingHT/TXimg/'+ this.dataS.img; 
                }
            })
            .catch(error => {
                console.log(error);
            });
    }
};
</script>
