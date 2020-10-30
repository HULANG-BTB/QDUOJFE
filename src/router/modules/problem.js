/* Layout */
import IndexLayout from '@/layout/index/index'
import Components from '@/views/index'

export default [
  {
    path: '/problem',
    component: IndexLayout,
    redirect: '/problem/list',
    children: [
      {
        path: 'list',
        component: Components['problem-list'],
        name: 'ProblemList',
        meta: { title: '问题' }
      },
      {
        path: 'detail/:id',
        component: Components['problem-detail'],
        name: 'ProblemDetail',
        meta: { title: '问题详细' }
      }
    ]
  }
]
