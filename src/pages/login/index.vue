<template>
 <div class="container">
  <div class="remind-box" v-if="remind">
    <image class="remind-img" :src="img1"/>
  </div>
  <div v-else>
    <div class="content">
      <div class="hd" :style="{transform:'rotateZ('+angle+'deg)'}">
        <image class="logo" :src="img2"/>
        <image class="wave" :src="img3" mode="aspectFill"/>
        <image class="wave wave-bg" :src="img3" mode="aspectFill"/>
      </div>
      <div class="bd">
        <button class="confirm-btn" type="primary" lang="zh_CN" open-type="getUserInfo" @getuserinfo="bindGetUserInfo">授权登录</button>
        <text class="copyright">森果 senguo.cc</text>
      </div>
    </div>
  </div>
  <sg-logo/>
</div>
</template>

<script>
import SgLogo from '@/components/common/SgLogo' 

import img1 from 'static/images/loading.gif'
import img2 from 'static/images/senguo_logo.png'
import img3 from 'static/images/wave.png'
import global_store from './store'

export default {
    components: {SgLogo},
    data () {
        return {
            img1,
            img2,
            img3,
            remind: '加载中',
            angle: 0
        }
    },
    computed: {
    
    },
    beforeMount() {
        this.login()
        setTimeout(() => {
            this.remind = ''
        }, 1000);
    },
    methods: {
        // 登录
        login () {
            if (wx.getStorageSync('cookie')) {
                global_store.commit('globalUserinfo',wx.getStorageSync('userInfo'))
                wx.redirectTo({
                    url: '/pages/index/main',
                });
                return;
            }
            wx.login({
                success: res => {
                    // 发送 res.code 到后台换取 openId, sessionKey, unionId
                    global_store.commit('globalCode',res.code)
                    wx.setStorageSync('code', res.code);
                }
            });
        },
        bindGetUserInfo (e) {
            let res = e.mp.detail;
            if (!res.userInfo) {
                return false;
            }
            // 可以将 res 发送给后台解码出 unionId
            global_store.commit('globalUserinfo',res.userInfo)
            wx.setStorageSync('userInfo', res.userInfo);
            this.remind='登录中';
            let arg = {
                code: global_store.state.globalData.code,
                encryptedData: res.encryptedData,
                iv: res.iv,
                signature: res.signature,
                rawData: res.rawData,
                userInfo: res.userInfo,
            }
            this.https.post('/customer/applet/login', arg)
                .then(res => {
                    if (res.success) {
                            wx.redirectTo({url: '/pages/index/main'})
                        } else {
                            let error_text = res.error_text || '登录失败';
                            wx.showModal({
                                title: '系统提示',
                                content: error_text + '，请稍后再试！',
                                showCancel: false
                            });
                        }
                });
        }
    },
}
</script>

<style>
/* pages/start/start.wxss */
page{
  font-family: -apple-system-font, Helvetica Neue, Helvetica, sans-serif;
  font-size: 10pt;
  line-height: 150%;
  min-height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
.container {
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #69C3AA;
  align-items: stretch;
  padding: 0;
  height: 100%;
  overflow: hidden;
  justify-content: space-between;
  box-sizing: border-box;
} 
.content{
  flex: 1;
  display: flex;
  position: relative;
  z-index: 10;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding-bottom: 450rpx;
  background: -webkit-gradient(linear, left top, left bottom, from(rgba(244,244,244,0)), color-stop(0.1, #f4f4f4), to(#f4f4f4));
  opacity: 0;
  transform: translate3d(0,100%,0);
  animation: rise 3s cubic-bezier(0.19, 1, 0.22, 1) .25s forwards;
}

.remind-box {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 300rpx;
}
.remind-img {
  width: 250rpx;
  height: 250rpx;
  padding-bottom: 25rpx;
}

@keyframes rise{
  0% {opacity: 0;transform: translate3d(0,100%,0);}
  50% {opacity: 1;}
  100% {opacity: 1;transform: translate3d(0,450rpx,0);}
}
.title{
  position: absolute;
  top: 30rpx;
  left: 50%;
  width: 600rpx;
  height: 200rpx;
  margin-left: -300rpx;
  opacity: 0;
  animation: show 2.5s cubic-bezier(0.19, 1, 0.22, 1) .5s forwards;
}

.smalltitle{
  position: absolute;
  top: 50rpx;
  left: 50%;
  width: 600rpx;
  height: 200rpx;
  margin-left: -300rpx;
  opacity: 0;
  animation: show 2.5s cubic-bezier(0.19, 1, 0.22, 1) .5s forwards;
}

@keyframes show{
  0% {opacity: 0;}
  100% {opacity: .95;}
}

.hd {
  position: absolute;
  top: 0;
  left: 50%;
  width: 1000rpx;
  margin-left: -500rpx;
  height: 200rpx;
  transition: all .35s ease;
}
.logo {
  position: absolute;
  z-index: 2;
  left: 50%;
  bottom: 200rpx;
  width: 160rpx;
  height: 160rpx;
  margin-left: -80rpx;
   border-radius: 160rpx; 
  animation: sway 10s ease-in-out infinite;
  opacity: .95;
}
@keyframes sway{
  0% {transform: translate3d(0,20rpx,0) rotate(-15deg); }
  17% {transform: translate3d(0,0rpx,0) rotate(25deg); }
  34% {transform: translate3d(0,-20rpx,0) rotate(-20deg); }
  50% {transform: translate3d(0,-10rpx,0) rotate(15deg); }
  67% {transform: translate3d(0,10rpx,0) rotate(-25deg); }
  84% {transform: translate3d(0,15rpx,0) rotate(15deg); }
  100% {transform: translate3d(0,20rpx,0) rotate(-15deg); }
}
.wave {
  position: absolute;
  z-index: 3;
  right: 0;
  bottom: 0;
  opacity: 0.725;
  height: 260rpx;
  width: 2250rpx;
  animation: wave 10s linear infinite;
}
.wave-bg {
  z-index: 1;
  animation: wave-bg 10.25s linear infinite;
}
@keyframes wave{
  from {transform: translate3d(125rpx,0,0);}
  to {transform: translate3d(1125rpx,0,0);}
}
@keyframes wave-bg{
  from {transform: translate3d(375rpx,0,0);}
  to {transform: translate3d(1375rpx,0,0);}
}

.bd {
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  animation: bd-rise 2s cubic-bezier(0.23,1,0.32,1) .75s forwards;
  opacity: 0;
}
@keyframes bd-rise{
  from {opacity: 0; transform: translate3d(0,60rpx,0); }
  to {opacity: 1; transform: translate3d(0,0,0); }
}

.confirm-btn {
  font-size: 13pt;
  line-height: 85rpx;
  height: 85rpx;
  color: #fff;
  text-align: center;
  border-radius: 100rpx;
  margin: 40% 20%;
}
button[type="primary"].confirm-btn {
    background-color: #69C3AA;
} 
.confirm-btn:active {
  opacity: .8;
}


.copyright {
  font-size: 28rpx;
  color: #999;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 30rpx;
  text-align: center;
}
</style>
