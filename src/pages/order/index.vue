<template>
  <div class="order">
    <van-tabbar :active="active" :fixed="false" @change="onChange">
        <van-tabbar-item>全部</van-tabbar-item>
        <van-tabbar-item>未处理</van-tabbar-item>
        <van-tabbar-item>待处理</van-tabbar-item>
        <van-tabbar-item>已完成</van-tabbar-item>
    </van-tabbar>
    <order-card :actives="active"></order-card>
    <sg-logo/>
  </div>
</template>

<script>
import SgLogo from '@/components/common/SgLogo' 
import OrderCard from '@/components/order/OrderCard'
export default {
    components:{OrderCard, SgLogo},
    data () {
        return {
            active: 0
        }
    },
    methods: {
        onChange(event) {
            this.active = parseInt(event.mp.detail);
        }
    }
}
</script>

<style>
.order .van-tabbar-item--active {
    border-bottom:3px solid #48b6a4;
    color: #48b6a4;
}
</style>
