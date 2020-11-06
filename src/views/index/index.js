export default {
  home: () => import('./home' /* webpackChunkName: "home" */),
  'problem-detail': () => import('./problem/detail' /* webpackChunkName: "problem-detail" */),
  'problem-list': () => import('./problem/list' /* webpackChunkName: "problem-list" */),
  'contest-list': () => import('./contest/list' /* webpackChunkName: "problem-list" */),
  'contest-detail': () => import('./contest/detail' /* webpackChunkName: "problem-list" */),
  'contest-info': () => import('./contest/detail/components/contest-info' /* webpackChunkName: "contest-info" */),
  'contest-problem': () => import('./contest/detail/components/contest-problem' /* webpackChunkName: "contest-info" */)
}
