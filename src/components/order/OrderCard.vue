<template>
  <div class="order-card">
    <div class="order-list mt10 plr10" v-for="(items,index) in orderList" :key="index" v-if="index === actives">
        <a v-for="(item,index2) in orderList[index].orders" :key="index2" :href="'/pages/orderDetail/main?orderId='+item.order_id" class="order-card bgfff plr10 mb10">
            <div class="height40 borderbottom clip right-more-info">
                单号：{{item.order_num}}（{{item.pay_txt}}）
                <div class="inline c999 fr">详情</div>
            </div>
            <div class="height30 clip">店铺：{{item.shop_name}}</div>
            <div v-if="item.type==3" class="height30 clip">自提点：{{item.address_text}}</div>
            <div v-else class="height30 clip">送至：{{item.address_text}}</div>
            <div class="height30 clip">
                <div v-if="item.order_status==5||item.order_status==6||item.order_status==7" class="inline fl sendTime clip">已送达：{{item.send_time}}</div>
                <div v-else class="inline fl sendTime clip">预计：{{item.send_time}}送达</div>
                <div class="text-red inline fr">{{item.new_totalprice}}元</div>
            </div>
        </a>
    </div>
  </div>
</template>

<script>
export default {
    props: {
        actives:{
            type:Number,
            default:0
        }
    },
  data () {
    return {
      orderList: [
            {
                nomore: false,
                page: 1,
                action: 'all',
                orders: []
            },
            {
                nomore: false,
                page: 1,
                action: 'unhandled',
                orders: []
            },
            {
                nomore: false,
                page: 1,
                action: 'waiting',
                orders: []
            },
            {
                nomore: false,
                page: 1,
                action: 'finish',
                orders: []
            }
        ]
    }
  },
  computed:{
      active(){
          this.getOrderList();
          return this.actives;
      }
  },
  beforeMount() {
  },
  methods:{
      getOrderList: function (_page = 1) {
        //订单列表
        let index = this.actives;
        let that = this;
        let action = this.orderList[index].action;
        let args = {
            action: action,
            page: _page
        };
        this.loading();
        this.orderList[index].orders = [];
        this.https.post('/customer/orders?action=' + action, args)
            .then(res => {
                let orderres = that.orderList[index];
                orderres.nomore = res.nomore;//是否加载完
                orderres.page = _page;//当前加载页码
                if (res.orders) {
                    for (let i = 0, size = res.orders.length; i < size; i++) {
                        let pay_type = res.orders[i].pay_type;
                        let pay_txt = '';
                        if (pay_type == 1) {
                            pay_txt = "货到付款";
                        } else if (pay_type == 2) {
                            pay_txt = "余额支付";
                        } else {
                            pay_txt = "在线支付";
                        }
                        res.orders[i].pay_txt = pay_txt;
                        orderres.orders.push(res.orders[i]);
                    }
                } else {
                    orderres.orders = [];
                }
                that.orderList[index] = orderres;
                wx.hideLoading();
            });
    },
  }
}
</script>

<style>
</style>
