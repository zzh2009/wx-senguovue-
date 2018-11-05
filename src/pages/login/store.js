// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    globalData: {
        userInfo: null,
        shop_code: 0,
        code: 0,
        shop_id: 0,
        page_title: '森果+1',
        API_URL: 'https://i.senguo.cc',
        shareTitle: '森果-果蔬批发零售收银管理专家',  //默认分享标题
        sharePath: '/pages/start/start',         //默认分享路径
        shareImg: '/images/senguo_logo.png'  ,    //默认分享图片
        shoppage_title_id: ''
    }
  },
  mutations: {
    globalUserinfo: (state , paload) => {
        state.globalData.userInfo = paload;
    },
    globalCode: (state , paload) => {
        state.globalData.code = paload;
    },
    setGlobalData:(state , paload) => {
        state.globalData[paload.name] = paload.data;
    }
  }
})

export default store
