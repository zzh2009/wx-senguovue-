import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

export default {
    config: {
      navigationBarTitleText: '个人中心',
      enablePullDownRefresh: true,
      usingComponents: {
        "van-button": "../../../static/vant/button/index"
      }
    }
  }
  