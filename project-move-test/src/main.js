import 'babel-polyfill'
import './hotcss'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import fastclick from 'fastclick'
import './assets/style/index.scss'
// import vConsole from 'vconsole'
// import 'lib-flexible'

fastclick.attach(document.body)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
