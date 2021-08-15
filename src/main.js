import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import HighchartsVue from 'highcharts-vue'
import './styles/index.css' //element-ui/lib/theme-chalk/index.css
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(HighchartsVue)
new Vue({
  render: h => h(App),
}).$mount('#app')
