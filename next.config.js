const { ASSET_PREFIX } = process.env;
const withPlugins = require("next-compose-plugins");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
const { DRUPAL_API } = process.env;

// Get the domain only from the DRUPAL_API env variable.
const DRUPAL_API_DOMAIN_ONLY = DRUPAL_API.replace("https://", "");
// Generate consistent build id, so RP can proxy `_next/data/scout` assets.
const SCOUT_BUILD_ID = "scout";

const nextConfig = {
  generateBuildId: async () => SCOUT_BUILD_ID,
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
    const { isServer } = options;

    // Fixes bug in SendGridApi datasource, error: "Module not found: Can't resolve 'fs' in"
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
      };
    }

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
      "nypl-pantheon.ddev.site",
      DRUPAL_API_DOMAIN_ONLY,
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
      "contentcafe11.btol.com",
      "contentcafecloud.baker-taylor.com",
      "img1.od-cdn.com",
      "ic.od-cdn.com",
    ],
  },
  experimental: {
    // Disable the isr memory cache, to avoid mismatched .next files.
    // @see https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration#self-hosting-isr
    isrMemoryCacheSize: 0,
  },
};

module.exports = withPlugins([[withBundleAnalyzer]], nextConfig);
