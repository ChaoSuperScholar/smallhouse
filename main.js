import Vue from 'vue'
import App from './App'
import {
	request,
	baseurl
} from 'config/api.js'
import pub from 'config/public.js'

Vue.config.productionTip = false
Vue.prototype.$request = request
Vue.prototype.$baseurl = baseurl
Vue.prototype.$pub = pub
App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
