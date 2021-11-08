import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/logout',
    name: 'Logout',
    component: () => import(/* webpackChunkName: "about" */ '../views/Logout.vue')
  },
  {
    path: '/board',
    name: 'Board',
    props: true,
    component: () => import('../views/customer/Board')

  },
  {
    path: '/cutomer',
    name: 'CustomerView',
    component: () => import('../components/customer/CustomerView')
  },
  {
    path: '/errorLog',
    name: 'ErrorLogView',
    component: () => import('../components/customer/ErrorLogView')
  },
  {
    path: '/customerDetail',
    name: 'CustomerDetailView',
    component: () => import('../components/customer/CustomerDetailView')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
