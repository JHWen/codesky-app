import request from '../request'


export function postAnswer(questionId, content) {
  return request({
    method: 'post',
    url: '/api/answer',
    data: {
      questionId: questionId,
      content: content,
    }
  });
}
