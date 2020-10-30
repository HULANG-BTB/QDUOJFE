/* Layout */
import IndexLayout from '@/layout/index/index'
import Components from '@/views/index'

export default [
  {
    path: '/rank',
    component: IndexLayout,
    children: [
      {
        path: 'acm',
        component: Components['rank-acm'],
        name: 'ACM-Rank',
        meta: { title: 'ACM排名' }
      },
      {
        path: 'oi',
        component: Components['rank-oi'],
        name: 'OI-Rank',
        meta: { title: 'OI排名' }
      }
    ]
  }
]
