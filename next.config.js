module.exports = {
  images: {
    domains: ['images.ctfassets.net', 'storage.googleapis.com'],
    loader: 'akamai',
    path: '/'
  },
  webpack(config, options) {
    config.module.rules.push({
      test: /\.mp3$/,
      use: {
        loader: 'file-loader'
      }
    })

    return config
  }
}