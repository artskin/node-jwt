<template>
<div class="login-bg">
  <div class="login-title">
    <h1>{{sysInfo.title}}</h1>
    <p>{{sysInfo.description}}</p>
  </div>
  <div class="login-box">
    <h2>注册</h2>
    <form action="#">
      <input v-model="form.uname" type="text"><br>
      <input v-model="form.pwd" type="password"><br>
      <button @click="regFn">注册</button>
    </form>
    <p>
      已有账号，直接 <router-link to="/login">登录</router-link>
    </p>
  </div>
</div>
</template>
<script type="module">
const { reactive,toRefs,watchEffect } = Vue;
const { useRouter, useRoute } = VueRouter;
export default {
  name:'reg',
  setup(props,ctx){
    const router = useRouter()
    const state = reactive({
      form:{
        uname:'',
        pwd:'',
      },
      sysInfo:vm.sysInfo
    })

    const regFn = (e)=>{
      e.preventDefault();
      vm.$http({
        url: '/api/reg',
        method: 'post',
        data: {
          username:state.form.uname,
          password:btoa(state.form.pwd)
        }
      }).then((res)=>{
        alert(res.msg)
        if(res.code == 200){
          router.push('/login')
        }
      })
    }

    return {
      ...toRefs(state),
      regFn
    }
  }
}
</script>