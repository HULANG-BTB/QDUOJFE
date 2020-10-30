module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'https://qduoj.com',
        changeOrigin: true,
        secure: false
      }
    }
  },
  pluginOptions: {
    i18n: {
      locale: 'cn',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false
    }
  }
}
