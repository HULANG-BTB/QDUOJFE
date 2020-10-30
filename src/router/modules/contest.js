/* Layout */
import IndexLayout from '@/layout/index/index'
import Components from '@/views/index'

export default [
  {
    path: '/contest',
    component: IndexLayout,
    children: [
      {
        path: '',
        component: Components['contest'],
        name: 'Contest',
        meta: { title: '竞赛' }
      }
    ]
  }
]
