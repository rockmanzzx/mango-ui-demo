import { createRouter, createWebHistory } from 'vue-router'


import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import NotFound from '@/views/NotFound.vue'
import store from '@/store'
import api from '@/http/api'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/404',
      name: 'notFound',
      component: NotFound
    }

    // {
    //   path: '/',
    //   name: 'home',
    //   component: HomeView
    // },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ],
  
})

router.beforeEach((to, from, next) => {  
  let userName = sessionStorage.getItem('user')
  if (to.path === '/login') {
    if (userName) {
      next({path: '/'})
    } else {
      next()
    }
  } else {
    if (!userName) {
      next({path: '/login'})
    } else {
      addDynamicMenuAndRoutes(userName, to, from)
      next()
    }
  }
})

function addDynamicMenuAndRoutes(userName, to, from) {
  if (store.state.app.menuRouteLoaded) {
    console.log('动态路由和菜单已存在')
    return
  }
  api.menu.findNavTree({'userName': userName}).then(res => {
    console.log(res);

  }).catch(res => {
    console.log(res);
    
  })
}



export default router
