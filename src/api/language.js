export const category = '编程语言相关接口'
const baseUrl = '/api/languages'

export default [
  {
    name: '获取编程语言列表',
    method: 'getLanguageList',
    url: `${baseUrl}`,
    type: 'get'
  }
]
