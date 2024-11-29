import { createRouter, createWebHistory } from "vue-router";

import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import NotFound from "@/views/NotFound.vue";
import store from "@/store";
import api from "@/http/api";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/404",
      name: "notFound",
      component: NotFound,
    },

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
});

router.beforeEach((to, from, next) => {
  let userName = sessionStorage.getItem("user");
  if (to.path === "/login") {
    if (userName) {
      next({ path: "/" });
    } else {
      next();
    }
  } else {
    if (!userName) {
      next({ path: "/login" });
    } else {
      addDynamicMenuAndRoutes(userName, to, from);
      next();
    }
  }
});

function addDynamicMenuAndRoutes(userName, to, from) {
  if (store.state.app.menuRouteLoaded) {
    console.log("动态路由和菜单已存在");
    return;
  }
  api.menu
    .findNavTree({ userName: userName })
    .then((res) => {
      let dynamicRoutes = addDynamicRoutes(res.data)
      if (!router.options.routes[0].children) {
        router.options.routes[0].children = [];
      }
      router.options.routes[0].children = router.options.routes[0].children.concat(dynamicRoutes)
      router.options.routes.forEach(route => {
        router.addRoute(route)
      })
      store.commit('menuRouteLoaded', true)
      store.commit('setNavTree', res.data)

      api.user.findPermissions({'name': userName})
      .then(res => {
        console.log('findPermissions: ')
        console.log(res)
        store.commit('setPerms', res.data)
      })
      .catch(res => {
        console.log('findPermissions error: '+ res)
    })
    .catch((res) => {
      console.log('findNavTree error: '+ res)
    })
  })
}

function addDynamicRoutes(menuList = [], routes = []) {
  var temp = [];
  for (let i = 0; i < menuList.length; i++) {
    if (menuList[i].children && menuList[i].children.length >= 1) {
      temp = temp.concat(menuList[i].children);
    } else if (menuList[i].url && /\S/.test(menuList[i].url)) {
      menuList[i].url = menuList[i].url.replace(/^\//, "");
      var route = {
        path: menuList[i].url,
        component: null,
        name: menuList[i].name,
        meta: {
          icon: menuList[i].icon,
          index: menuList[i].id,
        },
      };
      try {
        let array = menuList[i].url.split("/");
        let url = "";
        for (let i = 0; i < array.length; i++) {
          url +=
            array[i].substring(0, 1).toUpperCase() +
            array[i].substring(1) +
            "/";
        }
        url = url.substring(0, url.length - 1);
        route["component"] = (resolve) => require([`@/views/${url}`], resolve);
      } catch (e) {
        console.log('addDynamicRoutes error: ' + e);
      }
      routes.push(route);
    }
  }
  if (temp.length >= 1) {
    addDynamicRoutes(temp, routes);
  } else {
    console.log("动态路由加载...");
    console.log(routes);
    console.log("动态路由加载完成.");
  }
  return routes
}

export default router;
