<template>
  <div class="spend-container">
    <div class="user-info bgfff">
        <div class="img-info">
            <img class="userinfo-avatar" :src="userInfo.headimgurl_small" alt="">
            <div>
                <span class="userinfo-nickname">{{userInfo.nickname}}</span>
                <img v-if="userInfo.support_grade_css=='super-vip'" class="vip-img" :src="img1">
                <img v-if="userInfo.support_grade_css=='gold-vip'" class="vip-img" :src="img2">
                <img v-if="userInfo.support_grade_css=='ordinary-vip'" class="vip-img" :src="img3">
                <span class="c999">{{userInfo.support_grade}}</span>
            </div>
        </div>
        <div class="wrap-balance">
            <div class="info-item border-right">积分：{{userInfo.shop_point}}</div>
            <div class="info-item">余额：{{userInfo.shop_balance}}</div>
        </div>
    </div>
    <div class="height40 plr10">累计消费{{userInfo.purchase_times}}次，{{userInfo.purchase_money}}元</div>
    <div class="bgfff record-list">
        <div class="height30" v-for="(item,index) in spendList" :key="index">{{item.create_date}} {{item.create_time}}
        <div class="fr inline">{{item.type}}
            <text class="text-yellow mlr4">{{item.money}}</text>元
        </div>
        </div>
    </div>
  </div>
</template>

<script>
import img1 from 'static/images/vip_icon1.png'
import img2 from 'static/images/vip_icon2.png'
import img3 from 'static/images/vip_icon3.png'
export default {
    props:{
        spendList:{
            type:Array,
            default:[]
        },
        userInfo:{
            type:Object,
            default:{}
        },

    },
    data () {
        return {
            img1,
            img2,
            img3
        }
    },
}
</script>

<style>
.spend-container .user-info{
    padding: 0 20rpx;
}
.spend-container .img-info{
    position: relative;
    padding: 20rpx 0;
    padding-left: 100rpx;
    height: 120rpx;
    box-sizing: border-box;
    line-height: 80rpx;
}
.spend-container .userinfo-avatar{
    position: absolute;
    left: 0;
    top: 20rpx;
    width: 80rpx;
    height: 80rpx;
    border-radius: 50%;
}
.spend-container .userinfo-nickname{
    margin-right: 40rpx;
}
.spend-container .vip-img{
    width: 46rpx;
    height: 40rpx;
    margin-right: 10rpx;
    vertical-align: middle;
}
.spend-container .info-item{
    display: inline-block;
    width: 50%;
    text-align: center;
    line-height: 80rpx;
    border-top: 1px solid #ddd;
}
.spend-container .record-list{
    box-sizing: border-box;
    padding: 20rpx;
}
.spend-container .border-right{
    position: relative;
}
.spend-container .border-right:before{
    content: '';
    display: inline-block;
    width: 1px;
    height: 40rpx;
    background: #ddd;
    position: absolute;
    right: 0;
    top: 20rpx;
}
.spend-container .mlr4{
    margin: 0 4rpx;
}
.spend-container .wrap-spendList{
    height: 100vh;
}
</style>
