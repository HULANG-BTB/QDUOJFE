import router from '../index'
import { getPageTitle } from '@/utils/view'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })

router.beforeEach((to, from, next) => {
  document.title = getPageTitle(to.meta.title)
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})
