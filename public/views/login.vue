<template>
<div class="login-bg">
  <div class="login-title">
    <h1>{{sysInfo.title}}</h1>
    <p>{{sysInfo.description}}</p>
  </div>
  <div class="login-box">
    <h2>登录</h2>
    <form action="">
      <input placeholder="请输入用户名" v-model="form.uname" type="text"><br>
      <input placeholder="请输入用密码" v-model="form.pwd" type="password"><br>
      <button @click="loginFn">登录</button>
    </form>
    <p>
      没有账号，请先 <router-link to="/reg">注册</router-link>
    </p>
  </div>
</div>
</template>
<script type="module">
const { reactive,computed,toRefs,watchEffect,renderTemplate,getCurrentInstance } = Vue;
const { useRouter, useRoute } = VueRouter;


export default {
  name:'login',
  setup(props,ctx){
    const router = useRouter()
    const state = reactive({
      sysInfo:vm.sysInfo,
      form:{
        uname:'admin',
        pwd:'123456aa',
      }
    })
    
    const loginFn = (e)=>{
      e.preventDefault();
      let params = {
        username:state.form.uname,
        password:btoa(state.form.pwd)
      }
      vm.$http({
        url: '/api/login',
        method: 'post',
        data: params
      }).then(res=>{
        if(res.token){
          axios.defaults.headers['authorization'] = res.token;
          window.localStorage.setItem('token',res.token)
          //window.vm.$router.push()
          router.push({
            path:'/userinfo',
            query:{id:res.id}
          })
        }else{
          alert(res.msg)
        }
      })
    }
    return {
      ...toRefs(state),
      loginFn
    }
  }
}
</script>