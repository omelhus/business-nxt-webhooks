import { z } from "zod";

export const BusinessNXTWebhookPayloadSchema = z.object({
  tableIdentifier: z.string(),
  customerNo: z.number(),
  companyNo: z.number(),
  primaryKeys: z.record(z.union([z.string(), z.number()])).array(),
  event: z.enum(["UPDATE", "INSERT", "DELETE"]),
  timestamp: z.string(),
});

export type BusinessNXTWebhookPayload = z.infer<
  typeof BusinessNXTWebhookPayloadSchema
>;
