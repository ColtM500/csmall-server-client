import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    children: [
      {
        path: '/sys-admin/product/album/add-new',
        component: () => import('../views/sys-admin/permission/product/AlbumAddNewView.vue')
      },
      {
        path: '/sys-admin/product/album',
        component: () => import('../views/sys-admin/permission/product/AlbumListView.vue')
      },
      {
        path: '/sys-admin/product/category',
        component: () => import('../views/sys-admin/permission/product/CategoryListView.vue')
      },
      // ======================== 权限管理 ========================
      {
        path: '/sys-admin/permission/admin/add-new',
        component: () => import('../views/sys-admin/permission/permission/AdminAddNewView')
      },
      {
        path: '/sys-admin/permission/admin',
        component: () => import('../views/sys-admin/permission/permission/AdminListView')
      },
    ]
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/login',
    component: () => import('../views/LoginView.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
