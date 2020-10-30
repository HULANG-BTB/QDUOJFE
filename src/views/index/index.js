export default {
  home: () => import('./home' /* webpackChunkName: "home" */),
  'problem-detail': () => import('./problem/detail' /* webpackChunkName: "problem-detail" */),
  'problem-list': () => import('./problem/list' /* webpackChunkName: "problem-list" */)
}
