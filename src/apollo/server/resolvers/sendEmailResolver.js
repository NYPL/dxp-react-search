const sendEmailResolver = {
  Mutation: {
    sendEmail: async (parent, args, { dataSources }) => {
      console.log(args.input.emailTo);
      const response = await dataSources.sendGridApi.sendEmail(
        args.input.emailTo,
        args.input.emailCc,
        args.input.emailBody
      );
      return response;
    },
  },
  SendEmailPayload: {
    status: (payload) => payload.status,
    emailTo: (payload) => payload.emailTo,
    emailCc: (payload) => payload.emailCc,
    emailBody: (payload) => payload.emailBody,
    enableEmail: (payload) => payload.enableEmail,
  },
};

export default sendEmailResolver;
