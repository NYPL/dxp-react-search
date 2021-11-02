import { RESTDataSource } from "apollo-datasource-rest";
var nodemailer = require("nodemailer");
var sgTransport = require("nodemailer-sendgrid-transport");
const { SENDGRID_API_KEY, SENDGRID_EMAIL_ENABLE } = process.env;

class SendGridApi extends RESTDataSource {
  constructor() {
    super();
  }

  async sendEmail(emailTo, emailCc, emailBody) {
    // Sendgrid options.
    const options = {
      service: "SendGrid",
      auth: {
        api_key: SENDGRID_API_KEY,
      },
    };
    const sendGridTransporter = nodemailer.createTransport(
      sgTransport(options)
    );

    const email = {
      from: "webfeedback@nypl.org",
      to: emailTo,
      cc: emailCc ? emailCc : null,
      subject: "Location Request Visit",
      text: "Hello world",
      html: emailBody,
    };

    if (SENDGRID_EMAIL_ENABLE === "true") {
      try {
        await sendGridTransporter.sendMail(email);
        let data = {
          status: "ok",
          emailTo: emailTo,
          emailCc: emailCc,
          enableEmail: true,
        };
        return data;
      } catch (error) {
        let data = {
          status: error.toString(),
        };
        return data;
      }
    } else {
      let data = {
        status: "ok",
        emailTo: emailTo,
        emailCc: emailCc,
        enableEmail: true,
      };
      return data;
    }
  }
}

export default SendGridApi;
