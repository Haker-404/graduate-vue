module.exports = {
  build: {
    env: require('./prod.env')
  },
  dev: {
    env: require('./dev.env'),
    proxyTable: {
      '/api': {
        target: 'http://localhost:9091',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  }
}
