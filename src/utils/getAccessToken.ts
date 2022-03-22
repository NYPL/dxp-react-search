const { DRUPAL_API, DRUPAL_CONSUMER_UUID, DRUPAL_CONSUMER_SECRET } =
  process.env;

export type AccessToken = {
  token_type: string;
  expires_in: number;
  access_token: string;
};

async function getAccessToken(): Promise<AccessToken | null> {
  if (!DRUPAL_CONSUMER_UUID || !DRUPAL_CONSUMER_SECRET) {
    return null;
  }

  const body = new URLSearchParams({
    client_id: DRUPAL_CONSUMER_UUID,
    client_secret: DRUPAL_CONSUMER_SECRET,
    grant_type: "client_credentials",
  });

  const DRUPAL_API_TUGBOAT = "https://qa-d8.nypl.org";
  const response = await fetch(`${DRUPAL_API_TUGBOAT}/oauth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body.toString(),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const result: AccessToken = await response.json();
  return result;
}

export default getAccessToken;
