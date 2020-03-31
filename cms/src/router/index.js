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
        path: '/management/pages',
        name: 'Content Management System',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/Pages.vue')
    },
    {
        path: '/management/blocks',
        name: 'Blocks',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/Blocks.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router