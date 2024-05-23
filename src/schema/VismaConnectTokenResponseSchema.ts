import z from "zod";

export const VismaConnectTokenResponseSchema = z.object({
  error: z.string().nullish(),
  access_token: z.string().nullish(),
  expires_in: z.number().optional(),
});
