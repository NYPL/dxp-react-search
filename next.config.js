// Special handling for nypl design system to be ie11 compatiable.
const withTM = require('next-transpile-modules')(['@nypl/design-system-react-components']);

module.exports = withTM({
  webpack: (config, options) => {
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
});
