export const category = '编程语言相关接口'
const baseUrl = '/api/announcement'

export default [
  {
    name: '获取公告列表',
    method: 'getAnnouncementList',
    url: `${baseUrl}`,
    type: 'get'
  }
]
