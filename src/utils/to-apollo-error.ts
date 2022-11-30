export default function toApolloError(
  error: Error & { extensions?: Record<string, any> },
  code: string = "INTERNAL_SERVER_ERROR"
): Error & { extensions: Record<string, any> } {
  let err = error;
  if (err.extensions) {
    err.extensions.code = code;
  } else {
    err.extensions = { code };
  }
  return err as Error & { extensions: Record<string, any> };
}
