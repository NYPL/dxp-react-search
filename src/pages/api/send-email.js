export default async (req, res) => {
  const { emailBody } = req.body;

  if (!emailBody) {
    // Throw an error if an email wasn't provided.
    return res.status(400).json({ error: "Email body is required" });
  }

  try {
    // Load the environment variables.

    // Debug
    console.log(emailBody);

    // Send a POST request to Mailchimp.
    /*const response = await fetch(
      `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${LIST_ID}/members`,
      {
        body: JSON.stringify(data),
        headers: {
          Authorization: `apikey ${API_KEY}`,
          'Content-Type': 'application/json',
        },
        method: 'POST',
      }
    );

    // Swallow any errors from Mailchimp and return a better error message.
    if (response.status >= 400) {
      return res.status(400).json({
        error: `There was an error subscribing to the newsletter.`,
      });
    }
    */

    // Why return empty error?
    return res.status(201).json({ error: "" });
  } catch (error) {
    return res.status(500).json({ error: error.message || error.toString() });
  }
};
