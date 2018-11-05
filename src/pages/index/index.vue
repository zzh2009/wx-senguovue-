<template>
  <div class="container">
      <div class="view-top">
            <img class="nav-bg" :src="bgImg"/>
            <div class="userinfo"  background-size="cover">
                <img class="userinfo-avatar" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover" />
                <div class="userinfo-nickname">
                <p class="card">{{userInfo.nickName}}</p>
            </div>
        </div>
      </div>
      <consumer-shop @shopLength="getshopLength" v-if="shopLength"></consumer-shop>
      <div v-else class="text-center mt30">暂无消费记录</div>
      <sg-logo/>
  </div>
</template>

<script>
import SgLogo from '@/components/common/SgLogo' 
import ConsumerShop from '@/components/consumerShop/ConsumerShop' 

import global_store from '../login/store'
import bgImg from 'static/images/nav_bg.jpg'

export default {
    components:{SgLogo, ConsumerShop},
    data () {
        return {
            motto: 'Hello World',
            userInfo: {},
            bgImg,
            shopLength: 1,
            active:0
        }
    },
  methods: {
    getshopLength(val){
        this.shopLength = val;
    }
  },
  beforeMount() {
      this.userInfo = wx.getStorageSync('userInfo');
  },
}
</script>

<style scoped>
.view-top {
    height:384rpx;
    overflow:hidden;
    position:relative;
    text-align:center;
}

.userinfo-avatar {
    width:140rpx;
    height:140rpx;
    margin:20rpx;
    border-radius:50%;
    border:2px solid #fff;
}

.userinfo-nickname {
    color:#fff;
    font-size:14px;
    justify-content:center;
    display:block;
}

.usermotto {
  margin-top: 150px;
}

.form-control {
  display: block;
  padding: 0 12px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
}

.counter {
  display: inline-block;
  margin: 10px auto;
  padding: 5px 10px;
  color: blue;
  border: 1px solid blue;
}
.userinfo{
    position:absolute;
    top:80rpx;
    width:100%;
}
.nav-bg{
    width:100%;
}
</style>
