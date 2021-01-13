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
      counter: 0
    }
  }
}
const app = Vue.createApp(App);
app.use(router)



// app.$http = http;
// app.mixin({
//   http(){
//     return http
//   }
// })

//Vue.prototype.$http = http

window.vm = app.mount('#app')