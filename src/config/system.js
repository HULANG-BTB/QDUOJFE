module.exports = {
  /**
   * @type {string} tokenKey
   * @description Cookie中存储token的key值
   */
  token: {
    /**
     * token存储时的key值
     */
    key: 'Auth',
    /**
     * token过期时间 设置remember_me时生效
     */
    expires: 1
  }
}
