import Vue from 'vue'
import VueResource from 'vue-resource'
import VueLocalStorage from 'vue-localstorage'

import App from './App'
import EditorMD from './EditorMD'
import EditorMDPreview from './EditorMDPreview'
import router from './router'
import globals from './globals'
import jQuery from 'static/jquery.min'

global.jQuery = jQuery;
global.$ = jQuery;

Vue.use(VueResource);
Vue.use(VueLocalStorage)
Vue.component("EditorMD", EditorMD)
Vue.component("EditorMDPreview", EditorMDPreview)

Vue.config.productionTip = false
Vue.prototype.globals = globals
Vue.http.options.emulateJSON = false;
Vue.http.options.root = "http://localhost:8081/"

var token = Vue.localStorage.get("token");
if (token) {
	Vue.http.headers.common['Authorization'] = 'Bearer ' + token;
}

new Vue({
	el: '#app',
	router: router,
	components: {
		App
	},
	template: '<router-view />'
})