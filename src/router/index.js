import { createRouter, createWebHistory } from 'vue-router'
import { UseUserStore } from '@/stores'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component:() => import('@/views/layout/LayoutContainer.vue'),
      redirect:'/article/manage',
      children:[
        {
          path:'/article/manage',
          component:()=>import('@/views/article/ArticleManage.vue')
        },
        {
          path:'/article/channel',
          component:()=>import('@/views/article/ArticleChannel.vue')
        },
        {
          path:'/user/profile',
          component:()=>import('@/views/user/UserProfile.vue')
        },
        {
          path:'/user/avatar',
          component:()=>import('@/views/user/UserAvatar.vue')
        },
        {
          path:'/user/password',
          component:()=>import('@/views/user/UserPassword.vue')
        }
      ]
    },
    {
      path: '/login',
      component:() => import('@/views/login/LoginPage.vue')
    }
  ]
})

// 全局拦截器
router.beforeEach((to) => {
  // canUserAccess() 返回 `true` 或 `false`
  const userstore = UseUserStore()
  if (!userstore.token && to.path !== '/login') return '/login'
})

export default router
