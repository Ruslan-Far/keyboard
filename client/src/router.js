import Vue from 'vue'
import Router from 'vue-router'
import Auth from '@/views/Auth'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Auth
        },
        {
            path: '/register',
            component: () => import('@/views/Register')
        },
        {
            path: '/keyboard',
            component: () => import('@/views/Keyboard'),
            meta: {
                requiresAuth: true
            }
        }
    ]
})
