<template>
  <div class="">
    <div class="mt10 bgfff plr10 ptb10">
    <div class="height30 clip">订单编号：{{order_data.new_num}}</div>
    <div class="height30 clip c999">下单时间：{{order_data.create_date}}</div>
    <div class="height30 clip c999">收货人：{{order_data.receiver}}</div>
    <div class="height30 clip c999">联系电话：{{order_data.phone}}</div>
    <dic v-if="order_data.type==3">
        <div class="height30 clip c999">自取地址：{{order_data.address_text}}</div>
        <div class="height30 clip c999">自取时间：{{order_data.send_time}}</div>
    </dic>
    <div v-else>
        <div class="height30 clip c999">收货地址：{{order_data.address_text}}</div>
        <div class="height30 clip c999">配送时间：{{order_data.send_time}}</div>
    </div>
    <div class="height30 clip c999" v-if="order_data.message">订单备注：{{order_data.message}}</div>
    <div class="height30 clip c999" v-else>订单备注：无</div>
    <div class="height30 clip">支付方式：{{order_data.pay_type}}</div>

    <!--<div class="mt10 plr10">
        <button type="default">取消订单</button>
    </div>-->
    </div>
  </div>
</template>

<script>
export default {
    props:{
        order_data:{
            type:Object,
            default:{}
        }
    },
    data () {
        return {
        
        }
    },
}
</script>

<style>
</style>
