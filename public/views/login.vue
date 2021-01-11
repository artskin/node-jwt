<template>
  <div class="reg">
    <h2>登录</h2>
    <code>正确账号是admin admin123</code>
    <form action="">
      <input v-model="form.uname" type="text"><br>
      <input v-model="form.pwd" type="text"><br>
      <button @click="regFn">登录</button>
    </form>
  </div>
</template>
<script>
const { reactive,computed,toRefs,watchEffect,renderTemplate,createApp } = Vue;
export default {
  name:'login',
  setup(props,ctx){
    const state = reactive({
      form:{
        uname:'admin',
        pwd:'123456',
      }
    })
    const regFn = ()=>{
      axios({
        method: 'post',
        url: '/api/login',
        data: state.form
      }).then((res)=>{
        console.log(res.data)
      })
    }
    return {
      ...toRefs(state),
      regFn
    }
  }
}
</script>