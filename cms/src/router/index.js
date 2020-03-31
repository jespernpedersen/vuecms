import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/management',
        name: 'Content Management System',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/Management.vue')
    },
    {
        path: '/management/pages',
        name: 'Pages',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/Management.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router