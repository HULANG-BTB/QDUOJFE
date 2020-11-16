import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })

const ProgressBar = {
  nums: 0,
  start: function() {
    if (this.nums === 0) {
      NProgress.start()
    }
    this.nums++
  },
  done: function() {
    this.nums--
    if (this.nums === 0) {
      setTimeout(() => {
        if (this.nums === 0) {
          NProgress.done()
        }
      }, 500)
    }
  }
}

export default ProgressBar
