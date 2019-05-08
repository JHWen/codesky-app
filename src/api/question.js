import request from '../request'


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


//添加问题
export function postQuestion(questionForm) {
  return request({
    method: 'post',
    url: '/api/question',
    data: {
      title: questionForm.title,
      content: questionForm.content
    }
  });
}

export function getQuestionData(questionId) {
  return request({
    method: 'get',
    url: `/api/question/${questionId}`,
  });
}
