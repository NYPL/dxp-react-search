import { NextApiRequest, NextApiResponse } from "next";
const { NEXT_PUBLIC_DRUPAL_PREVIEW_SECRET } = process.env;

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (!request?.query?.secret) {
    return response.status(401).json({ message: "No secret token provided." });
  }

  if (request.query.secret !== NEXT_PUBLIC_DRUPAL_PREVIEW_SECRET) {
    return response.status(401).json({ message: "Invalid secret token." });
  }

  if (!request.query.slug) {
    return response.status(401).json({ message: "No slug provided." });
  }

  try {
    // This should be the actual path not a rewritten path
    // i.e., for "/blog/[...slug]" this should be "/blog/post-1".
    await response.revalidate(request.query.slug as string);
    return response.json({ revalidated: true });
  } catch (error) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page until it expires.
    return response.status(500).send(`Error revalidating: ${error}`);
  }
}
