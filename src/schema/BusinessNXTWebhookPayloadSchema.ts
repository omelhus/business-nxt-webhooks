import { z } from "zod";

/* Sample payload
{
   "tableIdentifier":"Product",
   "customerNo":0,
   "companyNo":0,
   "primaryKeys":[
      {
         "ProductNo":"1001"
      }
   ],
   "event":"UPDATE",
   "timestamp":"2024-05-27T18:12:55.7720784Z"
}
*/

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
