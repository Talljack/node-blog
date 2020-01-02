import Vue from 'vue'
import Router from 'vue-router'
import { getToken } from '../common/js/storage'
const Main = () => import('@/components/index')
const Login = () => import('@/components/login')
const NotFound = () => import('@/components/notFound')
const About = () => import('@/components/about/about')

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'main',
            alias: '/main',
            component: Main
            // meta: {
            //     requireAuth: true
            // }
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: 'about',
            name: 'about',
            component: About,
            meta: {
                requireAuth: true
            }
        },
        {
            path: '*',
            name: 'notfound',
            component: NotFound
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {
        if (getToken()) {
            next()
        } else {
            next({
                path: '/login',
                query: {redirect: to.fullPath}
            })
        }
    } else {
        next()
    }
})

export default router
