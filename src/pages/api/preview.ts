import { NextApiRequest, NextApiResponse } from "next";
const { NEXT_PUBLIC_DRUPAL_PREVIEW_SECRET } = process.env;

// @see https://www.sanity.io/guides/nextjs-live-preview
// @see https://github.com/vercel/next.js/blob/canary/examples/cms-wordpress/pages/api/preview.ts
// @see https://github.com/vercel/next.js/blob/canary/examples/cms-wordpress/pages/posts/%5Bslug%5D.tsx

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (!request?.query?.preview_secret) {
    return response.status(401).json({ message: "No secret token provided." });
  }

  if (request.query.preview_secret !== NEXT_PUBLIC_DRUPAL_PREVIEW_SECRET) {
    return response
      .status(401)
      .json({ message: "Invalid preview secret token." });
  }

  if (!request.query.slug) {
    return response.status(401).json({ message: "No slug provided." });
  }

  // Enable Preview Mode by setting the cookies.
  response.setPreviewData({
    uuid: request?.query?.uuid,
    revisionId: request?.query?.revision_id,
  });

  // Redirect to the path from the fetched route.
  const previewUrl = `/${request?.query?.slug}?uuid=${request.query.uuid}&revision_id=${request.query.revision_id}`;
  response.writeHead(307, { Location: previewUrl ?? "/" });

  return response.end();
}
