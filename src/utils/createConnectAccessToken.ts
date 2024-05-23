import z from "zod";

const schema = z.object({
  error: z.string().nullish(),
  access_token: z.string().nullish(),
  expires_in: z.number().optional(),
});

export async function createConnectAccessToken(scopes?: string[]) {
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
  const parsed = schema.safeParse(data);
  if (parsed.success) {
    if (parsed.data.error) {
      console.error(
        "Unable to obtain token",
        process.env.VISMA_CLIENT_ID,
        parsed.data.error
      );
      return null;
    }
    return parsed.data.access_token;
  }
}
