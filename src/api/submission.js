export const category = '题库相关接口'
const baseUrl = '/api/submission'

export default [
  {
    name: '获取题目列表',
    method: 'submitProblem',
    url: `${baseUrl}`,
    type: 'post'
  },
  {
    name: '获取提交结果',
    method: 'getSubmissionStatus',
    url: `${baseUrl}`,
    type: 'get'
  },
  {
    name: '获取提交是否存在',
    method: 'getSubmissionExists',
    url: `${baseUrl}_exists`,
    type: 'get'
  },
  {
    name: '获取提交列表',
    method: 'getSubmissionList',
    url: `${baseUrl}s`,
    type: 'get'
  },
  {
    name: '设置题目分享状态',
    method: 'changeShareStatus',
    url: `${baseUrl}`,
    type: 'put'
  }
]
