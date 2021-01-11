const { defineAsyncComponent } = Vue;
const Home = { template: '<div>Home</div>' }
const Login = { template: '<div>登录</div>' }
const { loadModule } = window['vue3-sfc-loader'];

const sfcContent = `
  <template>
    Hello World !
  </template>
`;
const options = {
  moduleCache: {
    vue: Vue,
  },
  getFile(url) {
    console.log(url)
    // if ( url === './myComponent.vue' )
    //   return Promise.resolve(sfcContent);
    return fetch(url).then(res => res.ok ? res.text() : Promise.reject( new Error(res.statusText) ));
  },
  addStyle() {},
}
const AsyncComp = defineAsyncComponent({
  loader:()=>{}
})
const routes = [
  {
    path:'/',
    component: Home,
  },
  {
    path:'/login',
    component: Login
  },
  {
    path:'/reg',
    //component: () => loadModule('./views/reg.vue?v='+ +new Date(),options)
    component: () => loadModule('./views/reg.vue',options)
    //component : defineAsyncComponent(()=> import('../views/reg.vue'))
    //component : createAsyncRouteComponent(()=> import('../views/reg.vue'))
    //component : AsyncComp
  }
]
// function createAsyncRouteComponent (loader) {
//   return defineAsyncComponent({
//     onError (err) {
//       console.log(err)
//     },
//     loader,
//   });
// }
console.log(window)

const router = VueRouter.createRouter({
  history:VueRouter.createWebHashHistory(),
  routes,
})

export default router