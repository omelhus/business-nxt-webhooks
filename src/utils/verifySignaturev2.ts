import { APIGatewayEvent } from "aws-lambda";
import crypto from "crypto";

export function verifySignaturev2(req: APIGatewayEvent) {
  const signature = req.headers["x-vwd-signature-v1"];
  const body = req.body;
  const secrets = process.env.VISMA_SUBSCRIPTION_SECRET?.split(",");
  if (!signature || !body || !secrets) {
    return false;
  }
  for (const secret of secrets) {
    if (verifySignature(signature, body, secret)) {
      return true;
    }
  }
  return false;
}

function verifySignature(signature: string, body: string, secret: string) {
  const hmac = crypto
    .createHmac("sha256", secret)
    .update(body)
    .digest("base64");
  return hmac === signature;
}
