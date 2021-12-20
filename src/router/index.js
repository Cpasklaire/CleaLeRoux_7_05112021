import Vue from 'vue'
import VueRouter from 'vue-router'
import VueRouteMiddleware from 'vue-route-middleware'
import Home from '../views/Home.vue'
import auth from '../middleware/auth'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/wall',
    name: 'Wall',
    component: () => import('../views/Wall.vue'),
    meta: {
      middleware: auth
    }
  },
  {
    path: '/profil',
    name: 'Profil',
    component: () => import('../views/Profil.vue'),
    meta: {
      middleware: auth
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach(VueRouteMiddleware())

export default router
