import { NextApiRequest, NextApiResponse } from "next";

export default async function exit(
  _nextApiRequest: NextApiRequest,
  response: NextApiResponse
) {
  response.clearPreviewData();
  response.writeHead(307, { Location: "/" });
  response.end();
}
