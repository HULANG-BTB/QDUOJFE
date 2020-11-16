export const category = '题库相关接口'
const baseUrl = '/api/contest'

export default [
  {
    name: '获取竞赛列表',
    method: 'getContestList',
    url: `${baseUrl}s`,
    type: 'get'
  },
  {
    name: '获取竞赛信息',
    method: 'getContestInfo',
    url: `${baseUrl}`,
    type: 'get'
  },
  {
    name: '获取竞赛权限',
    method: 'getContestAccess',
    url: `${baseUrl}/access`,
    type: 'get'
  },
  {
    name: '检查竞赛密码',
    method: 'checkContestPassword',
    url: `${baseUrl}/password`,
    type: 'post'
  },
  {
    name: '获取竞赛题目',
    method: 'getContestProblem',
    url: `${baseUrl}/problem`,
    type: 'get'
  },
  {
    name: '获取竞赛提交列表',
    method: 'getContestSubmissionList',
    url: `${baseUrl}_submissions`,
    type: 'get'
  },
  {
    name: '获取竞赛排名列表',
    method: 'getContestRankList',
    url: `${baseUrl}_rank`,
    type: 'get'
  },
  {
    name: '获取竞赛排名列表',
    method: 'getContestAnnouncementList',
    url: `${baseUrl}/announcement`,
    type: 'get'
  }
  // {
  //   name: '获取标签列表',
  //   method: 'getTagList',
  //   url: `${baseUrl}/tags`,
  //   type: 'get'
  // },
  // {
  //   name: '获取题目信息',
  //   method: 'getProblemInfo',
  //   url: `${baseUrl}`,
  //   type: 'get'
  // }
]
