import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const my_routes = [{
        // Frontpage Route
        path: '/',
        name: 'Home',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/Page.vue')
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
        path: '/management/:backendpage/upload',
        name: 'Content Management System',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/content/Library.vue')
    },
    {
        path: '/management/:backendpage/pages',
        name: 'Content Management System',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/content/Pages.vue')
    },

    {
        path: '/management/:backendpage/pages/:id/',
        name: 'Content Management System',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/content/Page.vue')
    },
    {
        path: '/management/:backendpage/blocks',
        name: 'Blocks',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/content/Blocks.vue')
    },
    {
        path: '/management/:backendpage/blocks/:id/',
        name: 'Block',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/content/Block.vue')
    },
    {
        path: '/management/:backendpage/banner',
        name: 'Banner',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/content/StatusBlock.vue')
    },
    {
        path: '/management/:backendpage/menu',
        name: 'Menu_Management',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/content/Menumanagement.vue')
    },
    {
        path: '/management/:backendpage/customers',
        name: 'Menu_Management',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/people/Customers.vue')
    },
    {
        path: '/management/:backendpage/accounts',
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