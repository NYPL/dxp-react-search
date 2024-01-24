export const sendEmailResolver = {
  Mutation: {
    sendEmail: async (parent, args, { dataSources }) => {
      const response = await dataSources.sendGridApi.sendEmail(
        args.input.emailTo,
        args.input.emailCc,
        args.input.emailBody
      );
      return response;
    },
  },
  SendEmailPayload: {
    statusCode: (payload) => payload.statusCode,
    emailEnable: (payload) => {
      let emailEnableBoolean = false;
      if (payload.emailEnable === "true") {
        emailEnableBoolean = true;
      }
      return emailEnableBoolean;
    },
    formData: (payload) => payload.formData,
  },
};
