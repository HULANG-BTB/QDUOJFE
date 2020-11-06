/* Layout */
import IndexLayout from '@/layout/index/index'
import Components from '@/views/index'

export default [
  {
    path: '/contest',
    component: IndexLayout,
    meta: {
      title: 'contest',
      icon: 'el-icon-s-platform'
    },
    sort: 2,
    children: [
      {
        path: '',
        component: Components['contest-list'],
        name: 'ContestList',
        meta: { title: 'contest', icon: 'el-icon-s-platform' }
      },
      {
        path: ':id',
        component: Components['contest-detail'],
        meta: { title: 'contest' },
        hidden: true,
        children: [
          {
            path: '',
            component: Components['contest-info'],
            name: 'ContesInfo',
            meta: { title: 'contest' },
            hidden: true
          },
          {
            path: 'problem',
            component: Components['contest-problem'],
            name: 'ContesProblem',
            meta: { title: 'contest' },
            hidden: true,
            children: [
              {
                path: ':pid',
                component: Components['contest-problem-detail'],
                name: 'ContestProblemDetail',
                meta: { title: 'contest' },
                hidden: true
              }
            ]
          }
        ]
      }
    ]
  }
]
