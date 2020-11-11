export const category = '排名相关接口'
const baseUrl = '/api'

export default [
  {
    name: '登录请求接口',
    method: 'login',
    url: `${baseUrl}/login`,
    type: 'post'
  },
  {
    name: '获取用户信息',
    method: 'getProfile',
    url: `${baseUrl}/profile`,
    type: 'get'
  }
]
