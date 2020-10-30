export const category = '题库相关接口'
const baseUrl = '/api/problem'

export default [
  {
    name: '获取题目列表',
    method: 'getProblemList',
    url: `${baseUrl}`,
    type: 'get'
  },
  {
    name: '获取标签列表',
    method: 'getTagList',
    url: `${baseUrl}/tags`,
    type: 'get'
  },
  {
    name: '获取题目信息',
    method: 'getProblemInfo',
    url: `${baseUrl}`,
    type: 'get'
  }
]
