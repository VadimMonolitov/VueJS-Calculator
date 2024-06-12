import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/pages/Home.vue')
    },
    {
      path: '/calculator',
      name: 'calc',
      component: () => import('@/pages/Calculator.vue')
    },
    {
      path: '/history',
      name: 'computed-history',
      component: () => import('@/pages/ComputedHistory.vue')
    },
    
  ]
})

export default router
