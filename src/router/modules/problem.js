/* Layout */
import IndexLayout from '@/layout/index/index'
import Components from '@/views/index'

export default [
  {
    path: '/problem',
    component: IndexLayout,
    meta: {
      title: 'problem',
      icon: 'el-icon-s-grid'
    },
    sort: 1,
    children: [
      {
        path: '',
        component: Components['problem-list'],
        name: 'ProblemList',
        meta: { title: 'problem', icon: 'el-icon-s-grid' }
      },
      {
        path: ':problem_id',
        component: Components['problem-detail'],
        name: 'ProblemDetail',
        meta: { title: '问题详细' },
        hidden: true
      }
    ]
  }
]
