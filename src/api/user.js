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

//关注用户
export function followMemberApi(memberId) {
  return request({
    method: 'post',
    url: `/api/member/${memberId}/follow`
  });
}

//取关用户
export function unfollowMemberApi(memberId) {
  return request({
    method: 'delete',
    url: `/api/member/${memberId}/follow`
  });
}


