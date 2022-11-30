import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "@apollo/server-plugin-landing-page-graphql-playground";
import { schema } from "../../apollo/server/schema";
import getDataSources from "./../../apollo/server/datasources/getDataSources";

const apolloServer = new ApolloServer({
  schema,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

export default startServerAndCreateNextHandler(apolloServer, {
  context: async () => {
    return {
      dataSources: getDataSources(),
    };
  },
});

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// /*
//  * There's an issue with apollo-server-micro where OPTIONS method
//  * will return with the wrong status code.
//  *
//  * This only happens if you try to make a cross-origin req to the
//  * /api/graphql route.
//  *
//  * @SEE https://github.com/apollographql/apollo-server/issues/2473
//  *
//  */
// // Set cors policy.
// const cors = Cors({
//   allowMethods: ["POST", "OPTIONS"],
//   origin: NEXT_PUBLIC_ALLOWED_ORIGIN,
// });

// const startServer = apolloServer.start();

// export default cors(async (req, res) => {
//   if (req.method === "OPTIONS") {
//     return res.end();
//   }
//   await startServer;
//   await apolloServer.createHandler({ path: "/api/graphql" })(req, res);
// });
