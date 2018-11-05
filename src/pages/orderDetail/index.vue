<template>
  <div class="">
      <order-top :status_txt="status_txt" :fruit_data="fruit_data" :order_data="order_data" :shop_data="shop_data" :tel="tel" />
      <order-bottom :order_data="order_data"/>
      <sg-logo/>
  </div>
</template>

<script>
import OrderTop from '@/components/orderDetail/OrderTop'
import OrderBottom from '@/components/orderDetail/OrderBottom'
import SgLogo from '@/components/common/SgLogo' 

import {getMathFloat, getGoodsImg} from '@/common/common'
export default {
    components:{SgLogo, OrderTop, OrderBottom},
    data () {
        return {
            order_id: '',
            tel: '',//商家电话
            shop_data: {},
            order_data: {},
            fruit_data: [],
            status_txt: ''
        }
    },
    onLoad: function (options) {
        // 页面初始化 options为页面跳转所带来的参数
        this.order_id = options.orderId;
        this.getOrderDetail();
    },
    methods:{
        getOrderDetail: function () {
        //获取订单详情
        this.loading();
        let args = {
            come_from: "wx_applet"
        }
        this.https.get('/customer/orders/detail/' + this.order_id,args)
            .then(res => {
                this.fruit_data = [];
                this.shop_data = res.shop_data;
                this.order_data = res.order_data;
                for (let key in this.order_data.order_fruits) {
                    let fruit = this.order_data.order_fruits[key];
                    fruit.total_price = getMathFloat(fruit.num * fruit.price);
                    fruit.imgurl = getGoodsImg(fruit.imgurl);
                    this.fruit_data.push(fruit);
                }
                let order_status = this.order_data.status;//订单状态
                let type = this.order_data.type;
                let isprint = this.order_data.isprint;
                let status_txt = '';
                if (order_status == -1) {
                    status_txt = "未支付";
                } else if (order_status == 0) {
                    status_txt = "已取消";
                } if (order_status == 1) {
                    if (type == 3) {
                        status_txt = "准备中";
                    } else {
                        if (isprint == "True") {
                            status_txt = "已处理";
                        } else {
                            status_txt = "已下单";
                        }
                    }
                } if (order_status == 2) {
                    status_txt = "已出库";
                } if (order_status == 4) {
                    if (type == 3) {
                        status_txt = "等待自取";
                    } else {
                        status_txt = "配送中";
                    }
                } if (order_status == 5) {
                    if (type == 3) {
                        status_txt = "自取完成";
                    } else {
                        status_txt = "已送达";
                    }
                } if (order_status == 7) {
                    status_txt = "已评价";
                }
                this.tel = this.shop_data.shop_phone;
                this.status_txt = status_txt;
                wx.hideLoading();
            });
        }
    }
}
</script>

<style>
</style>
