import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'home',
      keepAlive: true
    }
  },
  {
    path: '/sky',
    name: 'Sky',
    component: () => import('../views/Sky.vue')
  },
  {
    path: '/publish',
    name: 'Publish',
    component: () => import('../views/Publish.vue')
  },
  {
    path: '/letter',
    name: 'Letter',
    component: () => import('../views/Letter.vue')
  },
  {
    path: '/chart',
    name: 'Chart',
    component: () => import('../views/Chart.vue')
  },
  {
    path: '/banner',
    name: 'Banner',
    component: () => import('../views/Banner.vue')
  },
  {
    path: '/user',
    name: 'User',
    component: () => import('../views/User/Index.vue')
  },
  {
    path: '/introduction',
    name: 'Introduction',
    component: () => import('../views/User/Introduction.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/User/Login.vue')
  },
  {
    path: '/range',
    name: 'Range',
    component: () => import('../views/User/Range.vue')
  },
  {
    path: '/registerStep1',
    name: 'RegisterStep1',
    component: () => import('../views/User/RegisterStep1.vue')
  },
  {
    path: '/registerStep2',
    name: 'RegisterStep2',
    component: () => import('../views/User/RegisterStep2.vue')
  },
  {
    path: '/registerStep3',
    name: 'RegisterStep3',
    component: () => import('../views/User/RegisterStep3.vue')
  },
  {
    path: '/registerStep4',
    name: 'RegisterStep4',
    component: () => import('../views/User/RegisterStep4.vue')
  },
  {
    path: '/setting',
    name: 'Setting',
    component: () => import('../views/User/Setting.vue')
  },
  {
    path: '/userHead',
    name: 'UserHead',
    component: () => import('../views/User/UserHead.vue')
  },
  {
    path: '/userInfo',
    name: 'UserInfo',
    component: () => import('../views/User/UserInfo.vue')
  },
  {
    path: '/editNickName',
    name: 'EditNickName',
    component: () => import('../views/User/EditNickName.vue')
  }
]

// const router = new VueRouter({
//   routes
// })

const router = new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop
      }
      return { x: 0, y: to.meta.savedPosition || 0 }
    }
  }
})

export default router
