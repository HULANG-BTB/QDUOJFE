export const category = 'Session相关接口'
const baseUrl = '/api/sessions'

export default [
  {
    name: '分页Session列表',
    method: 'getSessionList',
    url: `${baseUrl}`,
    type: 'get'
  },
  {
    name: '分页Session列表',
    method: 'removeSession',
    url: `${baseUrl}`,
    type: 'delete'
  }
]
