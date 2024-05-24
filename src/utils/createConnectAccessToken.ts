import { VismaConnectTokenResponseSchema } from "~/schema/VismaConnectTokenResponseSchema";

let cachedAccessToken: string | null | undefined = null;
let cachedAccessTokenExpiresAt: number | null | undefined = null;

export async function createConnectAccessToken(scopes?: string[]) {
  if (
    cachedAccessToken &&
    cachedAccessTokenExpiresAt &&
    cachedAccessTokenExpiresAt > Date.now()
  ) {
    console.log("Using cached access token");
    return cachedAccessToken;
  }
  const url = "https://connect.visma.com/connect/token";
  const body = new URLSearchParams();
  body.append("grant_type", "client_credentials");
  body.append(`client_id`, process.env.VISMA_CLIENT_ID ?? ``);
  body.append(`client_secret`, process.env.VISMA_CLIENT_SECRET ?? ``);
  if (scopes) {
    body.append("scope", scopes?.join(" "));
  }

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body.toString(),
  });

  const data = await response.json();
  const parsed = VismaConnectTokenResponseSchema.safeParse(data);
  if (parsed.success) {
    if (parsed.data.error) {
      console.error(
        "Unable to obtain token",
        process.env.VISMA_CLIENT_ID,
        parsed.data.error
      );
      return null;
    }
    if (parsed.data.expires_in) {
      cachedAccessToken = parsed.data.access_token;
      cachedAccessTokenExpiresAt = Date.now() + parsed.data.expires_in * 1000;
    }
    return parsed.data.access_token;
  }
}
