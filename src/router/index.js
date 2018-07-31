import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export const constantRouterMap = [
    { path: '/',component:() => import('@/components/login'),hidden: true },
    { path: '/login',component:() => import('@/components/login'),hidden: true },
    { path: '/user',component:() => import('@/components/user'),hidden: true },
    { path: '/device',component:() => import('@/components/device'),hidden: true }
]

export default new VueRouter(
    {
        routes: constantRouterMap
    }
)