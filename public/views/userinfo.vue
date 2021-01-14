<template>
  <div class="ucenter">
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
    const getUser = (id)=>{
      return vm.$http({
        url:`/api/userinfo?id=${id}`,
        method: 'get',
      })
    }

    const getUserInfo = ()=>{
      getUser(state.userInfo.id).then(res=>{
        console.log(res)
        state.userInfo = res
      }).catch(err=>{
        console.log(err)
      })
      //axios.defaults.headers['authorization'] = window.localStorage.getItem('token');
      // axios({
      //   url: '/api/userinfo',
      //   method: 'get',
      //   params:{
      //     id:state.userInfo.id
      //   }
      // }).then((res)=>{
      //   console.log(res)
      //   state.userInfo = res.data
      // }).catch(err=>{
      //   console.log(err)
      // })
    }

    return {
      ...toRefs(state),
      getUserInfo
    }
  }
}
</script>