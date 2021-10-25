var nodemailer = require("nodemailer");
var sgTransport = require("nodemailer-sendgrid-transport");
const { SENDGRID_API_KEY } = process.env;
// @TODO move this to .env variable?
const ENABLE_EMAIL = 0;

export default async (req, res) => {
  const { emailBody, emailTo, emailCc } = req.body;

  if (!emailBody) {
    return res.status(400).json({ error: "Email body is required." });
  }
  if (!emailTo) {
    return res.status(400).json({ error: "Email to field is required." });
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
    to: emailTo,
    cc: emailCc ? emailCc : null,
    subject: "Location Request Visit",
    text: "Hello world",
    html: emailBody,
  };

  if (ENABLE_EMAIL) {
    try {
      await sendGridTransporter.sendMail(email);

      return res.status(201).json({
        status: "ok",
        data: {
          emailTo: emailTo,
        },
      });
    } catch (error) {
      return res.status(500).json({ error: error.message || error.toString() });
    }
  } else {
    return res.status(201).json({
      status: "ok",
      data: {
        emailTo: emailTo,
      },
    });
  }
};
