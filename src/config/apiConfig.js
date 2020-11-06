import apiConfig from '@/api'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const interceptors = {}

interceptors.request = (config) => {
  NProgress.start()
  // console.log('request', config)
  return config
}

interceptors.requestError = (error) => {
  NProgress.done()
  // console.log('reqError', error)
  return error
}

interceptors.response = (response) => {
  NProgress.done()
  return response.data
}

interceptors.responseError = (error) => {
  NProgress.done()
  // console.log('responseError', error)
  return error
}

export default {
  api: apiConfig,
  interceptors,
  alias: '$api',
  config: {
    xsrfHeaderName: 'X-CSRFToken',
    xsrfCookieName: 'csrftoken'
  }
}
