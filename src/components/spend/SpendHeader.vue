<template>
    <div class="spend-header">
        <img class="nav-bg" :src="shopInfo.shop_logo" alt="">
        <img class="shopinfo-img" :src="shopInfo.shop_logo" alt="">
        <div class="shopinfo cfff">
        <div class="mtr20 f16">{{shopInfo.shop_name}}</div>
        <div>{{shopInfo.shop_address_detail}}</div>
        <div class="mtr20">
            <!-- <div class="shop-phone" bindtap="goshop">进入店铺</div> -->
            <div class="shop-phone" :data-tel="shopInfo.shop_phone" @click="makePhoneCall">拨打电话</div>
        </div>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        shopInfo:{
            type: Object,
            default: {}
        },
        tel:{
            type: String,
            default: ''
        }
    },
    data () {
        return {
        
        }
    },
    methods:{
        makePhoneCall: function () {
            let phone = this.tel;
            if (phone) {
                wx.makePhoneCall({
                    phoneNumber: this.tel,
                    success: function () {
                    }
                })
            } else {
                this.modal('商家暂未设置联系电话');
        }
    },
    }
}
</script>

<style>
.spend-header{
    overflow: hidden;
    position: relative;
    height: 280rpx;
}
.spend-header .nav-bg{
    width: 100%;
    -webkit-filter: blur(8px);
    -moz-filter: blur(8px);
    -ms-filter: blur(8px);
    filter: blur(8px);
}
.spend-header .shopinfo{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    padding: 40rpx 20rpx;
    padding-left: 240rpx;
    box-sizing: border-box;
    background: rgba(0,0,0,.2);
}
.spend-header .shopinfo-img{
    position: absolute;
    left: 20rpx;
    top: 40rpx;
    width: 200rpx;
    height: 200rpx;
    z-index:9;
}
.spend-header .shop-phone{
    display: inline-block;
    width: 190rpx;
    margin-right: 24rpx;
    line-height: 64rpx;
    border: 1px solid #fff;
    border-radius: 64rpx;
    text-align: center;
}
</style>
