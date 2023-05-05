// @see https://nextjs.org/docs/advanced-features/preview-mode

import { NextApiRequest, NextApiResponse } from "next";
const { NEXT_PUBLIC_DRUPAL_PREVIEW_SECRET } = process.env;

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
  // @TODO doesn't work in dev mode?
  // This method adds 2 cookies: __prerender_bypass and __next_preview_data.
  response.setPreviewData({
    maxAge: 60,
    path: request.query.slug,
    uuid: request?.query?.uuid,
    revisionId: request?.query?.revision_id,
  });

  // Redirect to the path from the fetched route.
  const previewUrl = `${request?.query?.slug}?uuid=${request.query.uuid}&revision_id=${request.query.revision_id}`;
  response.writeHead(307, { Location: previewUrl ?? "/" });

  return response.end();
}
