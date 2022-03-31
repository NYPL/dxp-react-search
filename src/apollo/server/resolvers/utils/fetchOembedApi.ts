export default async function fetchOembedApi(
  oembedBaseUrl: string,
  embedCode: string
) {
  try {
    const response = await fetch(`${oembedBaseUrl}=${embedCode}`);
    const json = await response.json();
    return json.html;
  } catch (e) {
    console.error(e);
  }
}
