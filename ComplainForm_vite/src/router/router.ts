import { createRouter, createWebHistory } from 'vue-router'
import Form from '../view/Form.vue'
import Admin from '../view/Admin.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Form',
      component: Form
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin
    }
  ]
})

export default router