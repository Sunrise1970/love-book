import 'amfe-flexible'
import Vue from 'vue'
import './cube-ui'
import './vant-ui'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import FastClick from 'fastclick'
import { Toast } from 'cube-ui'
import Cookie from 'js-cookie'
import './assets/style/index.styl'
import { Slider } from 'ant-design-vue'
Vue.config.productionTip = false

Vue.component(Slider.name, Slider)

const fetch = axios.create({
  baseURL: 'http://154.92.17.14:8081',
  timeout: 10000,
  headers: { 'token': Cookie.get('token') || '' }
})

// FastClick-start
const str = navigator.userAgent.toLowerCase()
const ver = str.match(/cpu iphone os (.*?) like mac os/)
if (!ver) { // 非IOS系统
  // 引入fastclick 做相关处理
} else {
  if (parseInt(ver[1]) < 11) {
    // 去掉300ms延迟
    FastClick.attach(document.body)
  }
}
// 处理input[type="file"]的点透问题
FastClick.prototype.onTouchEnd = function () {
  var targetClass = event.target.className.split(' ')
  if (targetClass.indexOf('eladdimages') !== -1 || targetClass.indexOf('el-upload') !== -1) {
    return false
  }
}
// FastClick-end

// http request 拦截器
let loading
fetch.interceptors.request.use(
  config => {
    if (!process.server) {
      loading = Toast.$create({
        txt: ''
      }).show()
    }
    return config
  },
  error => {
    loading && loading.hide()
    return Promise.reject(error)
  }
)

// http response 拦截器
fetch.interceptors.response.use(
  response => {
    loading && loading.hide()
    // console.log('response', response.data)
    // 错误处理
    if (response.data.retCode !== '000000') {
      // token失效或不存在
      if (response.data.retCode === '999998') {
        Toast.$create({
          time: 1500,
          type: 'txt',
          txt: '用户登录信息已失效，请重新登录！'
        }).show()
        fetch.defaults.headers.common['token'] = ''
        window.location.replace('/login')
      } else {
        Toast.$create({
          time: 1500,
          type: 'txt',
          txt: response.data.retMsg || '未知错误'
        }).show()
      }
      return Promise.reject(response.data)
    } else {
      return Promise.resolve(response.data)
    }
  },
  error => {
    loading && loading.hide()
    Toast.$create({
      time: 1500,
      type: 'txt',
      txt: '系统繁忙，请稍后再试！'
    }).show()
    return Promise.reject(error.response.data)
  }
)
Vue.prototype.$axios = fetch
new Vue({
  router,
  store,
  fetch,
  render: h => h(App)
}).$mount('#app')
