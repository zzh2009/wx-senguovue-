<template>
  <div class="">
      <spend-header :shopInfo="shopInfo" :tel="tel"/>
      <spend-container :userInfo="userInfo" :spendList="spendList"/>
      <sg-logo/>
  </div>
</template>

<script>
import SpendHeader from '@/components/spend/SpendHeader'
import SpendContainer from '@/components/spend/SpendContainer'
import SgLogo from '@/components/common/SgLogo' 

import global_store from '../login/store'
export default {
    components:{SpendHeader, SpendContainer, SgLogo},
    data () {
        return {
            tel: '',//商家电话
            shop_code: '',//店铺号
            userInfo: {},
            spendList: [],
            shopInfo: {},
            page: 1,
            nomore: false,
        }
    },
    onLoad: function (options) {
        // 页面初始化 options为页面跳转所带来的参数
        this.shop_code = options.shop_code;
        this.getSpendList();
    },
    methods:{
        getSpendList () {
        //获取消费记录
        this.loading();
        let args = {
            come_from: "wx_applet"
        }
        this.https.get('/customer/usernavdetail/' + this.shop_code,args)
            .then(res =>{
                this.tel = res.shop_info.shop_phone;
                this.userInfo =  res.user_info;
                this.spendList =  res.datalist;
                this.shopInfo =  res.shop_info;
                wx.hideLoading();
                global_store.commit('setGlobalData',{name:'shop_id',data:res.shop_info.shop_id})
                global_store.commit('setGlobalData',{name:'shop_code',data:res.shop_info.shop_code})
                global_store.commit('setGlobalData',{name:'shoppage_title_id',data:res.shop_info.shop_name})
            });
    },
    }
}
</script>

<style>

</style>
