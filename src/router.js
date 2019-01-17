import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', name: 'index1',component: () => import('./views/admin/index/index1.vue')},
    {path: '/admin', name: 'index2',component: () => import('./views/admin/index/index.vue'), children:[]},
    {path: '/admin/login', name: 'login',component: () => import('./views/admin/login/index.vue')},
  ]
})
