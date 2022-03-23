import Cors from "micro-cors";

// Set cors policy.
const cors = Cors({
  allowMethods: ["GET", "POST", "OPTIONS"],
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
