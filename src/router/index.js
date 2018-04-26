import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import AdminLogin from '@/components/AdminLogin'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			name: 'Index',
			component: Index
		},
		{
			path: '/adminLogin',
			name: 'AdminLogin',
			component: AdminLogin
		}
	]
})
