import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const my_routes = [{
        // Frontpage Route
        path: '/',
        name: 'Home',
        component: Home
    },
    // Frontend Routes (needs to be dynamic)
    {
        path: '/:page',
        params: {
            menuid: ':menuid'
        },
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/Page.vue')
    },


    // Backend Routers
    {
        path: '/management/content/pages',
        name: 'Content Management System',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/content/Pages.vue')
    },

    {
        path: '/management/test',
        name: 'Test',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/content/TestSort.vue')
    },

    {
        path: '/management/content/pages/:id/',
        name: 'Content Management System',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/content/Page.vue')
    },
    {
        path: '/management/content/blocks',
        name: 'Blocks',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/content/Blocks.vue')
    },
    {
        path: '/management/content/banner',
        name: 'Banner',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/content/Banner.vue')
    },
    {
        path: '/management/content/menu',
        name: 'Menu_Management',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/content/Menumanagement.vue')
    },
    {
        path: '/management/people/customers',
        name: 'Menu_Management',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/people/Customers.vue')
    },
    {
        path: '/management/people/accounts',
        name: 'Menu_Management',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/people/Accounts.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: my_routes
})

export default router