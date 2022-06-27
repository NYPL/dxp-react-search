const { ASSET_PREFIX } = process.env;
const withPlugins = require("next-compose-plugins");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
const { DRUPAL_API } = process.env;

// Get the domain only from the DRUPAL_API env variable.
let DRUPAL_API_DOMAIN_ONLY = DRUPAL_API.replace("https://", "");
// @TODO Figure out if we're locking down dev and qa with basic auth.
// if (NEXT_PUBLIC_SERVER_ENV !== "production") {
//   DRUPAL_API_DOMAIN_ONLY = DRUPAL_API.replace("https://nypl1:nypl1@", "");
// }

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
      // Local
      "localhost",
      "nypl-d8.lndo.site",
      DRUPAL_API_DOMAIN_ONLY,
      // @TODO After pantheon migration remove old AWS domains.
      // Sandbox
      "sandbox-d8.nypl.org",
      "nyplorg-sandbox.s3.amazonaws.com",
      "treasures-d8.nypl.org",
      // QA
      "qa-cdn-d8-2.nypl.org",
      "qa-d8.nypl.org",
      // PROD
      "cdn-d8.nypl.org",
      "d8.nypl.org",
      // Digital collection image
      "images.nypl.org",
      // Remote catalog image
      "images.btol.com",
      "imagesa.btol.com",
      "imagesb.btol.com",
      "contentcafecloud.baker-taylor.com",
      "img1.od-cdn.com",
      "ic.od-cdn.com",
    ],
  },
};

module.exports = withPlugins([[withBundleAnalyzer]], nextConfig);
