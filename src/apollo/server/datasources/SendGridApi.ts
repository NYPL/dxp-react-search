import { RESTDataSource } from "@apollo/datasource-rest";
const sgMail = require("@sendgrid/mail");

// @SEE @sendgrid/mail
// https://docs.sendgrid.com/for-developers/sending-email/quickstart-nodejs?utm_source=pocket_mylist
// Status Codes: https://sendgrid.api-docs.io/v3.0/how-to-use-the-sendgrid-v3-api/api-responses

class SendGridApi extends RESTDataSource {
  constructor() {
    super();
  }

  async sendEmail(emailTo: string, emailCc: string, emailBody: string) {
    const { SENDGRID_API_KEY, SENDGRID_EMAIL_ENABLE } = process.env;

    let statusCode;
    let responseMessage;

    if (SENDGRID_EMAIL_ENABLE === "true") {
      sgMail.setApiKey(SENDGRID_API_KEY);

      const message = {
        from: "webfeedback@nypl.org",
        to: emailTo,
        cc: emailCc ? emailCc : null,
        subject: "Location Request Visit",
        html: emailBody,
      };

      try {
        let response = await sgMail.send(message);
        statusCode = response[0].statusCode;
        responseMessage = "Email sent.";
      } catch (error: any) {
        statusCode = error.code;
        responseMessage = error.message;
      }
    } else {
      statusCode = null;
      responseMessage = "Debug mode.";
    }

    return {
      statusCode: statusCode,
      message: responseMessage,
      formData: {
        emailTo: emailTo,
        emailCc: emailCc,
        emailBody: emailBody,
      },
      emailEnable: SENDGRID_EMAIL_ENABLE,
    };
  }
}

export default SendGridApi;
