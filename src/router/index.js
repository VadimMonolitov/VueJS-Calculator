import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import Calculator from '@/pages/Calculator.vue'
import ComputedHistory from '@/pages/ComputedHistory.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/calculator',
      name: 'calc',
      component: Calculator
    },
    {
      path: '/history',
      name: 'computed-history',
      component: ComputedHistory
    },
    
  ]
})

export default router
