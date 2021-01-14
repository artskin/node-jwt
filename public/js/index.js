import router from './router.js'
import $http from './request.js'
//console.log(http)
const { reactive,computed,toRefs,watchEffect,renderTemplate,createApp } = Vue;
const myMixin = {
  created() {
    //this.hello()
  },
  methods: {
    $http
  }
}
const App = {
  mixins: [myMixin],
  data() {
    return {
      sysInfo:{
        title:'JWT 登录系统',
        description:'基于Node + Express + MongoDB + Vue3 开发',
      }
    }
  }
}
const app = Vue.createApp(App);
app.use(router)

//Vue.prototype.$http = http

window.vm = app.mount('#app')
// console.log(Vue)
// console.log(app)
// console.log(window.vm)