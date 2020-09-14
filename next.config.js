const isProd = process.env.NODE_ENV === 'production';

module.exports = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    assetPrefix: isProd ? '/scout' : '',
    webpack(config, options) {
      const { dir } = options

      // Allows import of .gql files inside components
      config.module.rules.push({
        test: /\.(graphql|gql)$/,
        include: [dir],
        exclude: /node_modules/,
        use: [
          {
            loader: 'graphql-tag/loader'
          }
        ]
      })

      return config;
    }
  })
}
