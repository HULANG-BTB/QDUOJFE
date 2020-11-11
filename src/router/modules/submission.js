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
        meta: { title: '状态' },
        hidden: true
      },
      {
        path: ':submission_id',
        component: Components['submission-detail'],
        name: 'SubmissionDetail',
        meta: { title: '状态' },
        hidden: true
      }
    ]
  }
]
