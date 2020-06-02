import Vue from 'vue'
import Router from 'vue-router'

Vue.user(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'todo',
      component: () => import('./components/Todo.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./components/About.vue')
    }
  ]
})