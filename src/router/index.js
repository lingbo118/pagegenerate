import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/test'
  },
  {
    path: '/demo',
    name: 'demo',
    component: () => import('@/views/demo/index')
  },
  {
    path: '/page_generate',
    name: 'page_generate',
    component: () => import('@/views/demo/pageGenerate')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
