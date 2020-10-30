import Cookies from 'js-cookie'

export default {
  name: 'cookie',
  /**
   * 获取Cookie
   * @param {String} key
   * @param {Boolean} isJson
   * @returns {String | null}
   */
  get(key, isJson = false) {
    return Cookies.get(key, isJson)
  },

  /**
   * 设置Cookie
   * @param {String} key
   * @param {String | Number} val
   * @param {Object} attributes
   * @returns {Boolean | undefined}
   */
  set(key, val, attributes = {}) {
    return Cookies.set(key, val, attributes)
  },

  /**
   * 移除Cookie
   * @param {String} key
   * @returns {Boolean | undefined}
   */
  remove(key) {
    return Cookies.remove(key)
  }
}
