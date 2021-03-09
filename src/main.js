import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import elementui from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/alicon/iconfont.css'
import componentList from './components/list'
import componentAttrs from './components/attrs'

Vue.config.productionTip = false
Vue.use(componentList)
Vue.use(componentAttrs)
Vue.use(elementui)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
