import Vue from 'vue'
import App from './App'
import router from './router'
import globals from './globals'

Vue.config.productionTip = false
Vue.prototype.globals = globals

new Vue({
	el: '#app',
	router,
	components: { App },
	template: '<App/>'
})
