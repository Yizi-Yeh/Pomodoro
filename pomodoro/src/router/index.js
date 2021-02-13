import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Notfound from '../views/Notfound.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: '蕃茄鐘'
    }
  },
  {
    path: '/list',
    name: 'List',
    meta: {
      title: '蕃茄鐘 | 待辦清單'
    },
    component: () => import(/* webpackChunkName: "list" */ '../views/List.vue')
  },
  {
    path: '/settings',
    name: 'Settings',
    meta: {
      title: '蕃茄鐘 | 設定'
    },
    component: () => import(/* webpackChunkName: "settings" */ '../views/Settings.vue')
  },
  {
    path: '/*',
    name: 'Notfound',
    component: Notfound,
    meta: {
      title: '找不到頁面'
    }
  }
]

const router = new VueRouter({
  routes
})

router.afterEach((to, from) => {
  document.title = to.meta.title
})
export default router
