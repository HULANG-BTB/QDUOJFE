export const category = '排名相关接口'
const baseUrl = '/api/user_rank'

export default [
  {
    name: '分页获取排名列表',
    method: 'getRankList',
    url: `${baseUrl}`,
    type: 'get'
  }
]
