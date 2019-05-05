import request from '@/request'


export function login(name, password) {
  const data = {
    username: name,
    password: password
  };
  return request({
    method: 'post',
    url: '/api/login',
    data: data
  });
}

export function logout() {
  return request({
    method: 'post',
    url: '/api/logout'
  });
}

export function getUserInfo() {
  return request({
    method: 'get',
    url: '/api/me'
  });
}

export function register(username, password, checkPassword) {
  return request({
    method: 'post',
    url: '/api/register',
    data: {
      username: username,
      password: password,
      checkPassword: checkPassword
    }
  });
}

export function getPublicationsOfMember(username) {
  return request({
    method: 'get',
    url: `/api/member/${username}/publications`,
  });
}
