import { NextApiRequest, NextApiResponse } from "next";
const SDK = require("sfmc-sdk");

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const {
    SALESFORCE_CLIENT_ID,
    SALESFORCE_CLIENT_SECRET,
    SALESFORCE_AUTH_URL,
    SALESFORCE_ACCOUNT_ID,
    SALESFORCE_ENABLE,
  } = process.env;

  if (!request.body.email) {
    return response.status(401).json({ message: "No email provided." });
  }

  if (!request.body.list_id) {
    return response.status(401).json({ message: "No list id provided." });
  }

  if (SALESFORCE_ENABLE === "true") {
    const sfmc = new SDK({
      client_id: SALESFORCE_CLIENT_ID,
      client_secret: SALESFORCE_CLIENT_SECRET,
      auth_url: SALESFORCE_AUTH_URL,
      account_id: SALESFORCE_ACCOUNT_ID,
    });

    try {
      try {
        // Try to add a new Subscriber
        const soapCreate = await sfmc.soap.create("Subscriber", {
          SubscriberKey: request.body.email,
          EmailAddress: request.body.email,
          Attributes: [
            {
              Name: "Source Code",
              Value: request.body.source_code,
            },
          ],
          Lists: [
            {
              ID: request.body.list_id,
              Status: "Active",
            },
          ],
        });

        response.status(200).json({
          statusCode: "SUCCESS",
          statusMessage: soapCreate.Results[0].StatusMessage,
          formData: {
            email: request.body.email,
          },
        });
      } catch (e: any) {
        // If the Subscriber already exists, update the Subscriber
        if (e.json.Results[0].ErrorCode === 12014) {
          const soapUpdate = await sfmc.soap.update("Subscriber", {
            SubscriberKey: request.body.email,
            EmailAddress: request.body.email,
            // Make sure that if a subscriber was previously "Unsubscribed" the account gets activated
            Status: "Active",
            Attributes: [
              {
                Name: "Source Code",
                // @TODO this should be a dynamic value, and be passed as a body param?
                Value: request.body.source_code,
              },
            ],
            Lists: [
              {
                ID: request.body.list_id,
                Status: "Active",
              },
            ],
          });

          response.status(200).json({
            statusCode: "SUCCESS",
            statusMessage: soapUpdate.Results[0].StatusMessage,
            formData: {
              email: request.body.email,
            },
          });
        }
      }
    } catch (e: any) {
      console.log(e.json.Results[0]);

      response.status(200).json({
        statusCode: "ERROR",
        statusMessage: e.json.Results[0].StatusMessage,
        formData: {
          email: e.json.Results[0].Object.EmailAddress,
        },
      });
    }
  } else {
    response.status(200).json({
      statusCode: "TEST_MODE",
      statusMessage: "Api is in test mode. No data was sent to salesforce.",
      formData: {
        email: request.body.email,
      },
    });
  }
}
