var nodemailer = require("nodemailer");
var sgTransport = require("nodemailer-sendgrid-transport");
const { SENDGRID_API_KEY } = process.env;

const ENABLE_EMAIL = 0;

export default async (req, res) => {
  const { emailBody, toEmail } = req.body;

  if (!emailBody) {
    return res.status(400).json({ error: "Email body is required." });
  }
  if (!toEmail) {
    return res.status(400).json({ error: "To email is required." });
  }

  // Sendgrid
  const options = {
    service: "SendGrid",
    auth: {
      api_key: SENDGRID_API_KEY,
    },
  };
  const sendGridTransporter = nodemailer.createTransport(sgTransport(options));

  const email = {
    from: "webfeedback@nypl.org",
    to: toEmail,
    subject: "Hello",
    text: "Hello world",
    html: emailBody,
  };

  if (ENABLE_EMAIL) {
    try {
      // Load the environment variables.

      // Debug
      console.log(emailBody);
      await sendGridTransporter.sendMail(email);
      // Why return empty error on success?
      // @TODO this should return status: ok + response from sendgrid, and data sent?
      return res.status(201).json({ error: "" });
    } catch (error) {
      return res.status(500).json({ error: error.message || error.toString() });
    }
  } else {
    // Why return empty error on success?
    return res.status(201).json({ error: "" });
  }
};
