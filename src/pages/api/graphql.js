import { ApolloServer } from "apollo-server-micro";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { schema } from "../../apollo/server/schema";
import RefineryApi from "./../../apollo/server/datasources/RefineryApi";
import DrupalApi from "./../../apollo/server/datasources/DrupalApi";
import DrupalJsonApi from "./../../apollo/server/datasources/drupal-json-api/DrupalJsonApi";
import PlatformApi from "./../../apollo/server/datasources/PlatformApi";
import SendGridApi from "./../../apollo/server/datasources/SendGridApi";
import Cors from "micro-cors";
const { NEXT_PUBLIC_ALLOWED_ORIGIN } = process.env;

const apolloServer = new ApolloServer({
  //cache: "bounded",
  persistedQueries: false,
  schema,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  dataSources: () => {
    return {
      refineryApi: new RefineryApi(),
      drupalApi: new DrupalApi(),
      drupalJsonApi: new DrupalJsonApi(),
      platformApi: new PlatformApi(),
      sendGridApi: new SendGridApi(),
    };
  },
  context: ({ req }) => ({
    req,
  }),
});

export const config = {
  api: {
    bodyParser: false,
  },
};

/*
 * There's an issue with apollo-server-micro where OPTIONS method
 * will return with the wrong status code.
 *
 * This only happens if you try to make a cross-origin req to the
 * /api/graphql route.
 *
 * @SEE https://github.com/apollographql/apollo-server/issues/2473
 *
 */
// Set cors policy.
const cors = Cors({
  allowMethods: ["POST", "OPTIONS"],
  origin: NEXT_PUBLIC_ALLOWED_ORIGIN,
});

// export default cors((req, res) => {
//   if (req.method === "OPTIONS") {
//     return res.end();
//   }
//   return apolloServer.createHandler({ path: "/api/graphql" })(req, res);
// });

const startServer = apolloServer.start();

export default cors(async (req, res) => {
  if (req.method === "OPTIONS") {
    return res.end();
  }
  await startServer;
  await apolloServer.createHandler({ path: "/api/graphql" })(req, res);
});
