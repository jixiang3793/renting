module.exports = {
  env: {
    NODE_ENV: '"development"'
  },
  defineConstants: {
  },
  mini: {},
  h5: {
    devServer: {
      proxy: {
        '/api': 'http://localhost:7001',
        '/geocoder': 'http://api.map.baidu.com',
        ws: false,
        changeOrigin: true
      },
      port: 4300
    }
  }
}
