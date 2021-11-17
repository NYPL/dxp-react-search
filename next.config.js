const { ASSET_PREFIX } = process.env;
const withPlugins = require("next-compose-plugins");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
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
  // Redirect blogs paths to / for now.
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
    // This is a hacky workaround to fix a nextjs bug where the asset prefix is
    // not used by the default image loader. This is fixed in canary as of 11/8/2021.
    // @see https://github.com/vercel/next.js/pull/29307
    ...(ASSET_PREFIX && {
      path: `${ASSET_PREFIX}/_next/image`,
    }),
    domains: [
      "qa-cdn-d8-2.nypl.org",
      "sandbox-d8.nypl.org",
      "qa-d8.nypl.org",
      "treasures-d8.nypl.org",
      "nyplorg-sandbox.s3.amazonaws.com",
      "localhost",
    ],
  },
};

module.exports = withPlugins([[withBundleAnalyzer]], nextConfig);
