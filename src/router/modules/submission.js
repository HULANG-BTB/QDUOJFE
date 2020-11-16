/* Layout */
import IndexLayout from '@/layout/index/index'
import Components from '@/views/index'

export default [
  {
    path: '/submission',
    component: IndexLayout,
    meta: {
      title: 'status',
      icon: 'el-icon-s-shop'
    },
    sort: 3,
    children: [
      {
        path: '',
        component: Components['submission-list'],
        name: 'Submission',
        meta: { title: 'status' },
        hidden: true
      },
      {
        path: ':submission_id',
        component: Components['submission-detail'],
        name: 'SubmissionDetail',
        meta: { title: 'status' },
        hidden: true
      }
    ]
  }
]
