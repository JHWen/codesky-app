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

//关注问题
export function followQuestionApi(questionId) {
  return request({
    method: 'post',
    url: `/api/question/${questionId}/follow`
  });
}

//取关问题
export function unfollowQuestionApi(questionId) {
  return request({
    method: 'delete',
    url: `/api/question/${questionId}/follow`
  });
}
