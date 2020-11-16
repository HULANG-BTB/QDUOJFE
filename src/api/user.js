export const category = '用户相关接口'
const baseUrl = '/api'

export default [
  {
    name: '请求登录',
    method: 'login',
    url: `${baseUrl}/login`,
    type: 'post'
  },
  {
    name: '获取用户信息',
    method: 'getProfile',
    url: `${baseUrl}/profile`,
    type: 'get'
  },
  {
    name: '退出登录',
    method: 'logout',
    url: `${baseUrl}/logout`,
    type: 'get'
  },
  {
    name: '修改密码',
    method: 'savePassword',
    url: `${baseUrl}/change_password`,
    type: 'post'
  },
  {
    name: '修改邮箱地址',
    method: 'saveEmail',
    url: `${baseUrl}/change_email`,
    type: 'post'
  },
  {
    name: '更新用户信息',
    method: 'saveProfile',
    url: `${baseUrl}/profile`,
    type: 'put'
  },
  {
    name: '更新头像信息',
    method: 'saveAvatar',
    url: `${baseUrl}/upload_avatar`,
    type: 'post'
  }
]
