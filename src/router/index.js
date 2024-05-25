import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/Login/LoginView.vue'
import DefaultTemplate from '../templates/default.vue';
import EmployeesView from '../views/Employees/EmployeesView.vue'
import BulletinsView from '../views/Bulletins/BulletinsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      path: '/employees',
      name: 'employees',
      component: EmployeesView,
    },
    {
      path: '/bulletins',
      name: 'bulletins',
      component: BulletinsView
    },
  ]
})

export default router
