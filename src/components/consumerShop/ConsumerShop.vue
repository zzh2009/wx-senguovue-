<template>
  <div class="consumer-shop">
    <div class="bgfff plr10">
    <div class="height40 item right-more-info">
        <div class="item-title">我的订单</div>
        <a class="inline fr c999" href="/pages/order/main">查看订单</a>
    </div>
    </div>
    <div class="mt10 text-center">消费过的店铺</div>
    <div class="shop-list bgfff plr10 mt10">
        <a v-for="(item,index) in shopList" :key="index" class="shop-item borderbottom" open-type="navigate" :href="'/pages/spend/main?shop_code='+item.shop_code">
            <img class="shop-img" :src="item.shop_logo+'?imagediv2/1/w/100/h/100'"/>
            <div class="mt4">{{item.shop_name}}</div>
            <div>{{item.shop_address}}</div>
            <div class="go-shop right-more-info">查看记录</div>
        </a>
    </div>
  </div>
</template>

<script>
export default {
    data () {
        return {
            shopList: [],
            shopLength: 0
        }
    },
    beforeMount() {
        if (!wx.getStorageSync('cookie')) {
            wx.reLaunch({url: '/pages/login/main'})
        }
        this.getShopList();
    },
    onPullDownRefresh () {
        this.getShopList();
    },
    methods: {
        getShopList () {
            //获取消费过的店铺列表
            this.loading();
            let args = {
                come_from: "wx_applet"
            }
            this.https.get('/customer/usernav',args)
                .then(res =>{
                    let _shopList = res.shop_info;
                    if (_shopList) {
                        this.shopLength = _shopList.length;
                        this.shopList = _shopList;
                    }
                    wx.hideLoading();
                    wx.stopPullDownRefresh();
                    this.$emit("shopLength",this.shopLength)
                });
        }
    }
}
</script>

<style>
.consumer-shop .shop-item{
    position:relative;
    padding:10px 0;
    padding-left:60px;
    padding-right:70px;
    min-height:50px;
}
.consumer-shop .shop-list .shop-item:last-child{
    border-bottom: none;
}
.consumer-shop .shop-img{
    display: inline-block;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    position: absolute;
    left: 0;
}
.consumer-shop .go-shop{
    display: inline-block;
    position: absolute;
    right: 0;
    top: 20px;
    line-height: 30px;
    color: #999;
}
.consumer-shop .go-shop:before,.go-shop:after{
    top: 9px;
}
.consumer-shop .mt4{
    margin-top: 4px;
}
</style>
