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
    const getForm=()=>{
      //console.log(state)
      return state.form
    }
    //console.log(getForm)

    const regFn = ()=>{
      axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
      console.log( )
      fetch('/api/reg',{
        method:'post',
        body:{
          uname:'admin',
          pwd:'123456',
        }
      }).then(res=>{
        console.log(res)
      })

      axios.post('/api/reg',{
        firstName: 'Fred'
      }).then((res)=>{
        console.log(res)
      })
    }


    return {
      ...toRefs(state),
      regFn
    }
  }
}
</script>