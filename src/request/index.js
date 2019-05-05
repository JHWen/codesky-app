import axios from 'axios'

//创建axios实例
const instance = axios.create({
  baseURL: 'http://localhost:8081',
  timeout: 20000,
  withCredentials: true
});

// add a response interceptor
instance.interceptors.response.use(
  response => {
    const responseBody = response.data;
    //请求成功,自定义状态码 0
    if (responseBody.code === 0) {
      console.log('请求成功');
      return responseBody.data;
    } else {
      //出现异常或错误，返回错误信息
      return Promise.reject(responseBody.msg);
    }
  }, error => {
    const res = error.response.data;
    return Promise.reject(res.msg);
  });

export default instance;
