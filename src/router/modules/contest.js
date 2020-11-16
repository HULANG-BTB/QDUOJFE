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
        path: ':contest_id',
        component: Components['contest-detail'],
        meta: { title: 'contest' },
        hidden: true,
        children: [
          {
            path: '',
            component: Components['contest-info'],
            name: 'ContestInfo',
            meta: { title: 'contest' },
            hidden: true
          },
          {
            path: 'announcement',
            component: Components['contest-announcement'],
            name: 'ContestAnnouncement',
            meta: { title: 'contest' },
            hidden: true
          },
          {
            path: 'problem',
            component: Components['contest-problem'],
            meta: { title: 'contest' },
            hidden: true,
            children: [
              {
                path: '',
                component: Components['contest-problem-list'],
                name: 'ContestProblemList',
                meta: { title: 'contest' },
                hidden: true
              },
              {
                path: ':problem_id',
                component: Components['contest-problem-detail'],
                name: 'ContestProblemDetail',
                meta: { title: 'contest' },
                hidden: true
              }
            ]
          },
          {
            path: 'submission',
            component: Components['contest-submission'],
            meta: { title: 'contest' },
            hidden: true,
            children: [
              {
                path: '',
                component: Components['contest-submission-list'],
                name: 'ContestSubmissionList',
                meta: { title: 'contest' },
                hidden: true
              },
              {
                path: ':submission_id',
                component: Components['contest-submission-detail'],
                name: 'ContestSubmissionDetail',
                meta: { title: 'contest' },
                hidden: true
              }
            ]
          },
          {
            path: 'rank',
            component: Components['contest-rank'],
            name: 'ContestRank',
            meta: { title: 'contest' },
            hidden: true
          }
        ]
      }
    ]
  }
]
