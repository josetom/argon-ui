import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/pages/login/Login.vue'
import Register from '@/pages/register/Register.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Login
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    }
  ]
})
