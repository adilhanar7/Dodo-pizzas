import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Cart from '../views/Cart.vue'
import Admin from '../views/Admin.vue'
import CreatePizza from '../views/CreatePizza.vue'
import EditPreviewPizza from '../views/EditPreviewPizza.vue'
import Auth from '@/views/auth/Auth.vue'
// import Login from '@/views/auth/Login.vue'
// import SignUp from '@/views/auth/SignUp.vue'
import { user } from '@/composables/getUser.js'
const requireAuth = (to, from, next) => {
  if (!user.value) {
    return next({ name: 'auth' })
  }
  return next()
}
const requireNoAuth = (to, from, next) => {
  if (user.value) {
    return next({ name: 'Home' })
  }
  return next()
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    props: true,
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
    props: true,
    beforeEnter: requireAuth,
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    props: true,
    beforeEnter: requireAuth,
  },
  {
    path: '/createpizza',
    name: 'CreatePizza',
    component: CreatePizza,
    props: true,
    beforeEnter: requireAuth,
  },
  {
    path: '/editPreviewPizza/:title',
    name: 'EditPreviewPizza',
    component: EditPreviewPizza,
    props: true,
    beforeEnter: requireAuth,
  },
  {
    path: '/auth/',
    name: 'auth',
    component: Auth,
    props: true,
    beforeEnter: requireNoAuth,
    // children: [
    //   {
    //     path: '/auth/signUp',
    //     name: 'SignUp',
    //     component: SignUp,
    //   },
    //   {
    //     path: '/auth/login',
    //     name: 'Login',
    //     component: Login,
    //   },
    // ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
