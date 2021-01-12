<template>
  <div class="reg">
    <h2>欢迎，{{userInfo.username}}</h2>
    <pre>{{userInfo}}</pre>
  </div>
</template>
<script>
const { reactive,computed,toRefs,watchEffect,onMounted,watch } = Vue;
const { useRouter, useRoute } = VueRouter
export default {
  name:'userinfo',
  setup(props,ctx){
    //const router = useRouter()
    const state = reactive({
      userInfo:{
        uname:'',
        pwd:'',
      }
    })
    const route = useRoute()
    // watch((val)=>{
    //   state.userInfo.id = route.query.id
    // })
    
    onMounted(()=>{
      //console.log(route.get('query'))
      state.userInfo.id = route.query.id
      getUserInfo(route.query)
    })

    const getUserInfo = ()=>{
      axios.defaults.headers['authorization'] = window.localStorage.getItem('token');
      axios({
        url: '/api/userinfo',
        method: 'get',
        params:{
          id:state.userInfo.id
        }
      }).then((res)=>{
        console.log(res.data)
        state.userInfo = res.data
      })
    }

    return {
      ...toRefs(state),
      getUserInfo
    }
  }
}
</script>