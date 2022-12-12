import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import { ApolloServerPluginLandingPageDisabled } from "@apollo/server/plugin/disabled";
import { schema } from "../../apollo/server/schema";
import getDataSources from "./../../apollo/server/datasources/getDataSources";

const apolloServer = new ApolloServer({
  schema,
  plugins: [
    process.env.NODE_ENV === "production"
      ? ApolloServerPluginLandingPageDisabled()
      : ApolloServerPluginLandingPageLocalDefault(),
  ],
});

export default startServerAndCreateNextHandler(apolloServer, {
  context: async () => {
    return {
      dataSources: getDataSources(),
    };
  },
});

// @TODO Add back Cors policy or other workaround?
