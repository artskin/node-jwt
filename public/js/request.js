
let isLogout = false;
let SECOND   = 1000;

const options = {
  baseURL: '',
  timeout: 30 * SECOND,
}
const $http = axios.create(options)
$http.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem('token')
    if (token) {
      config.headers['authorization'] =  window.localStorage.getItem('token')
    }
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)
$http.interceptors.response.use(
  (response)=>{
    //console.log(response)
    if(isLogout){
      return
    }
    let res = response;
    if(res.status === 200){
      return Promise.resolve(res.data);
    }else{
      return Promise.reject(res);
    }
  },
  (error)=>{
    return Promise.reject(error);
  }
)

export default $http