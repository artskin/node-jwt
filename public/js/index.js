import router from './router.js'
import $http from './request.js'

const {createApp } = Vue;
const myMixin = {
  created() {
    //this.$http()
  },
  methods: {
    $http,
    loginOut: () =>{
      window.localStorage.removeItem('token')
      router.push('/login')
    }
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
window.vm = app.mount('#app')
// console.log(Vue)
// console.log(app)
// console.log(window.vm)