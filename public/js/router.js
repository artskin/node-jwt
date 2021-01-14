const { defineAsyncComponent } = Vue;
const Home = { template: '<div>Home</div>' }
const { loadModule } = window['vue3-sfc-loader'];

const options = {
  moduleCache: {
    vue: Vue,
  },
  getFile(url) {
    console.log(url)
    return fetch(url).then(res => res.ok ? res.text() : Promise.reject( new Error(res.statusText) ));
  },
  addStyle() {},
}

const routes = [
  {
    path:'/',
    redirect:'/reg',
    component: Home,
  },
  {
    path:'/login',
    component: () => loadModule('./views/login.vue',options)
  },
  {
    path:'/userinfo',
    component: () => loadModule('./views/userinfo.vue',options)
  },
  {
    path:'/reg',
    //component : defineAsyncComponent(()=> import('../views/reg.vue')),
    component: () => loadModule('./views/reg.vue',options)
  }
]
const router = VueRouter.createRouter({
  history:VueRouter.createWebHashHistory(),
  routes,
})

export default router