const localStorage = window.localStorage

export default {
  name: 'storage',
  /**
   * 获取localStorage
   * @param {String} key
   * @param {Boolean} isJson
   * @returns {String | null}
   */
  get(key, isJson = false) {
    return localStorage.getItem(key, isJson)
  },

  /**
   * 设置localStorage
   * @param {String} key
   * @param {String | Number} val
   * @param {Object} attributes
   * @returns {Boolean | undefined}
   */
  set(key, val) {
    return localStorage.setItem(key, val)
  },

  /**
   * 移除localStorage
   * @param {String} key
   * @returns {Boolean | undefined}
   */
  remove(key) {
    return localStorage.removeItem(key)
  },

  clear() {
    return localStorage.clear()
  }
}
