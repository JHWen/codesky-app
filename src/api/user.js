import request from '../request'


//更新用户信息
export function updateUserInfoApi(name, value) {
  return request({
    method: 'put',
    url: '/api/me',
    data: {
      [name]: value
    }
  });
}
