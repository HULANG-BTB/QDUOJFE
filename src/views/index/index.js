export default {
  home: () => import('./home' /* webpackChunkName: "home" */),
  'problem-detail': () => import('./problem/detail' /* webpackChunkName: "problem-detail" */),
  'problem-list': () => import('./problem/list' /* webpackChunkName: "problem-list" */),

  'contest-list': () => import('./contest/list' /* webpackChunkName: "problem-list" */),
  'contest-detail': () => import('./contest/detail' /* webpackChunkName: "problem-list" */),
  'contest-info': () => import('./contest/info' /* webpackChunkName: "contest-info" */),

  'contest-problem': () => import('./contest/problem' /* webpackChunkName: "contest-info" */),
  'contest-problem-list': () => import('./contest/problem/list' /* webpackChunkName: "contest-info" */),
  'contest-problem-detail': () => import('./contest/problem/detail' /* webpackChunkName: "contest-info" */),

  'contest-submission': () => import('./contest/submission' /* webpackChunkName: "contest-info" */),
  'contest-submission-list': () => import('./contest/submission/list' /* webpackChunkName: "contest-info" */),
  'contest-submission-detail': () => import('./contest/submission/detail' /* webpackChunkName: "contest-info" */),

  'submission-list': () => import('./submission/list' /* webpackChunkName: "contest-info" */),
  'submission-detail': () => import('./submission/detail' /* webpackChunkName: "contest-info" */),

  'rank-acm': () => import('./rank/acm' /* webpackChunkName: "contest-info" */),
  'rank-oi': () => import('./rank/oi' /* webpackChunkName: "contest-info" */)
}
