import Cors from "micro-cors";
const { NEXT_PUBLIC_ALLOWED_ORIGIN } = process.env;

// Set cors policy.
const cors = Cors({
  allowMethods: ["GET", "POST", "OPTIONS"],
  origin: `${NEXT_PUBLIC_ALLOWED_ORIGIN}`,
});

export default async function handler(req, res) {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: "url is required" });
  }
  // Run cors
  await cors(req, res);

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const result = await response.json();

  res.json(result);
}
