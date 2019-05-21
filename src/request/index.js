import axios from 'axios'

//创建axios实例
const instance = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 20000,
  withCredentials: true
});

// add a response interceptor
instance.interceptors.response.use(
  response => {
    const responseBody = response.data;
    //请求成功
    return Promise.resolve(responseBody.data);
  }, error => {
    const res = error.response.data;
    return Promise.reject(res.message);
  });

export default instance;
