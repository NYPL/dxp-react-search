const { ASSET_PREFIX } = process.env;

module.exports = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    assetPrefix: ASSET_PREFIX,
    async rewrites() {
      if (ASSET_PREFIX) {
        return [
          {
            source: `${ASSET_PREFIX}/_next/:path*`,
            destination: "/_next/:path*",
          },
        ];
      }
      return [];
    },
    // Redirect blogs paths for now.
    // @TODO Uncomment this before deploying LL work.
    /*async redirects() {
      return [
        {
          source: "/blogs",
          destination: "/",
          permanent: true,
        },
        {
          source: "/blogs/:path*",
          destination: "/",
          permanent: true,
        },
      ];
    },
    */
    webpack(config, options) {
      const { dir } = options;

      // Allows import of .gql files inside components
      config.module.rules.push({
        test: /\.(graphql|gql)$/,
        include: [dir],
        exclude: /node_modules/,
        use: [
          {
            loader: "graphql-tag/loader",
          },
        ],
      });

      return config;
    },
    images: {
      domains: [
        "qa-cdn-d8-2.nypl.org",
        "sandbox-d8.nypl.org",
        "nyplorg-sandbox.s3.amazonaws.com",
        "localhost",
      ],
    },
  });
};
