<template>
    <div class="order-top bgfff plr10">
        <div class="height40 borderbottom text-center">订单状态：<text class="text-red">{{status_txt}}</text></div>
        <div class="height40 borderbottom">
            <!-- <img src="/images/home_selected.png" alt=""> -->
            {{shop_data.shop_name}}
            <div class="inline fr shop-tel" @click="makePhoneCall">联系卖家</div>
        </div>
        <div class="mt10 goodslist">
            <div v-for="(item,index) in fruit_data" :key="index" class="goods-item">
                <img :src="item.imgurl" alt="" class="goods-img" >
                <div class="mt4">{{item.fruit_name}}</div>
                <div>
                    <div class="inline mr20">{{item.charge}}</div>
                    <div class="inline">数量：{{item.num}}</div>
                    <div class="inline fr">小计：{{item.total_price}}元</div>
                </div>
            </div>
        </div>
        <div v-if="order_data.goods_money_no_discount">
            <div class="c999 height30">不参加优惠商品总价
                <div class="inline fr text-red">+{{order_data.goods_money_no_discount}}元</div>
            </div>
            <div class="c999 height30">参加优惠商品总价
                <div class="inline fr text-red">+{{order_data.goods_money_discount}}元</div>
            </div>
        </div>
        <div v-else class="c999 height30">商品总价
            <div class="inline fr text-red">+{{order_data.goods_money}}元</div>
        </div>
        <div v-if="order_data.type!=5&&order_data.type!=8">
            <div v-if="order_data.minus_money" class="c999 height30">店铺满减
                <div class="inline fr text-red">-{{order_data.minus_money}}元</div>
            </div>
            <div v-if="order_data.support_discount!=10" class="c999 height30">会员折扣
                <div class="inline fr text-red">-{{order_data.support_minus_money}}元</div>
            </div>
            <div v-if="order_data.coupon_money" class="c999 height30">优惠券金额
                <div class="inline fr text-red">-{{order_data.coupon_money}}元</div>
            </div>
            <div v-if="order_data.point_money" class="c999 height30 borderbottom">会员折扣
                <div class="inline fr text-red">-{{order_data.point_money}}元</div>
            </div>
        </div>
        <div class="c999 height30 borderbottom">配送/服务费
            <div class="inline fr text-red">+{{order_data.freight}}元</div>
        </div>
        <div class="height40">
            <div class="inline fr">应付款：
                <div class="inline text-red">{{order_data.new_totalprice}}元</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        status_txt:{
            type:String,
            default:''
        },
        tel:{
            type:String,
            default:''
        },
        fruit_data:{
            type:Array,
            default:[]
        },
        order_data:{
            type:Object,
            default:{}
        },
        shop_data:{
            type:Object,
            default:{}
        }
    },
    data () {
        return {
        
        }
    },
    methods:{
        makePhoneCall(){
                let phone = this.tel;
                if (phone) {
                    wx.makePhoneCall({
                        phoneNumber: phone,
                        success: function () {
                        }
                    })
                } else {
                    this.modal('商家暂未设置联系电话');
                }
        }
    }
}
</script>

<style>
.order-top .shop-tel{
    margin-top: 5px;
    line-height: 30px;
    border-radius: 4px;
    color: #fff;
    background: #3C6;
    padding: 0 4px;
}
.order-top .goods-item{
    position: relative;
    margin-bottom: 4px;
    background: #FFFCEF;
    padding: 10rpx;
    padding-left: 120rpx;
    min-height: 100rpx;
}
.order-top .goods-img{
    position: absolute;
    left: 10rpx;
    top: 10rpx;
    display: inline-block;
    width: 100rpx;
    height: 100rpx;
}
.order-top .mt4{
    margin-top: 4px;
}
</style>
