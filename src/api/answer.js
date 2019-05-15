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

//点赞
export function voteAnswerApi(answerId, type) {
  return request({
    method: 'post',
    url: `/api/answer/${answerId}/vote`,
    data: {
      type: type
    }
  });
}
