// Copied from https://github.com/apollographql/apollo-server/blob/5352a9f57a26d65558dadc774dd406c67e40bd14/packages/apollo-server-errors/src/index.ts#L142
// This function was removed for some reason from apollo-server v4.
export type ApolloError = Error & { extensions: Record<string, any> };

export default function toApolloError(
  error: Error & { extensions?: Record<string, any> },
  code = "INTERNAL_SERVER_ERROR"
): Error & { extensions: Record<string, any> } {
  const err = error;
  if (err.extensions) {
    err.extensions.code = code;
  } else {
    err.extensions = { code };
  }
  return err as ApolloError;
}
