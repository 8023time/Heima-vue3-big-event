import { createRouter, createWebHistory } from 'vue-router'

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
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue'),
    // },
  ]
})

export default router
