const { ASSET_PREFIX } = process.env;

module.exports = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    // Test
    assetPrefix: ASSET_PREFIX,
    rewrites() {
      return [
        { source: `${ASSET_PREFIX}/_next/:path*`, destination: '/_next/:path*' }
      ]
    },
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
