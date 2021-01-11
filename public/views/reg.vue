<template>
  <div class="reg">
    <h2>注册</h2>
    <form action="">
      <input v-model="form.uname" type="text"><br>
      <input v-model="form.pwd" type="text"><br>
      <button @click="regFn">注册</button>
    </form>
  </div>
</template>
<script>
//const myRequest = new Request(url)
const { reactive,computed,toRefs,watchEffect,renderTemplate,createApp } = Vue;
//axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
export default {
  name:'reg',
  setup(props,ctx){
    console.log(ctx)
    const state = reactive({
      form:{
        uname:'admin',
        pwd:'123456',
      }
    })

    const regFn = ()=>{
      axios({
        method: 'post',
        url: '/api/reg',
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