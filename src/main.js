import Vue from 'vue'
import App from './App'

import request from '@/common/fetch'

Vue.config.productionTip = false
App.mpType = 'app'

Vue.mixin({
    data() {
      return {
        https: '',
      }
    },
    methods: {
        //跳转启动页，重新登录
        reload: function () {
            wx.removeStorageSync('cookie');
            wx.reLaunch({
                url: '/pages/start/start',
            });
        },
        loading: function () {
            wx.showLoading({
                title: '加载中',
                mask: true
            });
        },
        modal: function (str) {
            wx.showModal({
                title: '提示',
                content: str.toString(),
                showCancel: false
            });
        },
    },
    created() {
        this.https = new request
    }
  })
const app = new Vue(App)
app.$mount()

export default {
    // 这个字段走 app.json
    config: {
      // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
      pages: ['pages/login/main', '^pages/login/main'],
      window: {
        "backgroundTextStyle": "light",
        "navigationBarBackgroundColor": "#48b6a4",
        "navigationBarTitleText": "森果+",
        "navigationBarTextStyle": "#ffffff",
        "enablePullDownRefresh": false
      },
      usingComponents: {
        "van-toast": "../static/vant/toast/index"
      }
    }
  }