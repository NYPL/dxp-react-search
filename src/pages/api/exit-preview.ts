import { NextApiResponse } from "next";

export default async function exit(
  // @ts-ignore
  _,
  response: NextApiResponse
) {
  response.clearPreviewData();
  response.writeHead(307, { Location: "/" });
  response.end();
}
