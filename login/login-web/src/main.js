// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import {VuePlugin} from 'vuera'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import fastclick from 'fastclick'
import router from './router'
import store from './store'

Vue.use(ElementUI)
Vue.use(VuePlugin)
fastclick.attach(document.body)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})
