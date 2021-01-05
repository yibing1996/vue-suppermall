import axios from "axios";

export function request(config){
  // 1.创建axios的实例
  const instance = axios.create({
    baseURL:'http://152.136.185.210:7878/api/m5',
    timeout:5000
  })

  // 2.拦截器
  // 2.1请求拦截  第一个函数是请求成功,第二个函数是请求失败 一般不会失败,除非网络断掉
  instance.interceptors.request.use(config=>{
    // console.log(config)
    return config
  },err=>{
    console.log(err);
  })

  // 2.2响应拦截
  instance.interceptors.response.use(response=>{
    // console.log(response)
    return response.data
  },err=>{
    console.log(err);
  })

  // 3.发送真正的请求
  return instance(config)
}