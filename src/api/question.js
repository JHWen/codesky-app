import request from '@/request'


//问题管理相关api调用
export function getLatestQuestion(offset, limit) {
  return request({
    method: 'get',
    url: '/api/questions/latest',
    params: {
      offset: offset,
      limit: limit
    }
  });
}
