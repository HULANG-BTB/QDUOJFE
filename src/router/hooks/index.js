import { getPageTitle } from '@/utils/view'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })

const beforeEach = (to, from, next) => {
  document.title = getPageTitle(to.meta.title)
  NProgress.start()
  next()
}

const afterEach = () => {
  NProgress.done()
}

export default {
  beforeEach,
  afterEach
}
