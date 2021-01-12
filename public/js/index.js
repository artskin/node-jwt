import router from './router.js'

const { reactive,computed,toRefs,watchEffect,renderTemplate,createApp } = Vue;

const App = {
  data() {
    return {
      counter: 0
    }
  }
}
const app = Vue.createApp(App);
app.use(router)

window.vm = app.mount('#app')