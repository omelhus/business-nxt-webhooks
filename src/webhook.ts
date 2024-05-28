import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import { verifySignaturev2 } from "./utils/verifySignaturev2";
import { getVismaConnectHeaders } from "./utils/getVismaConnectHeaders";
import { BusinessNXTWebhookPayloadSchema } from "./schema/BusinessNXTWebhookPayloadSchema";
import { handleProductUpdate } from "./handlers/handleProductUpdate";
import { handleOrderUpdate } from "./handlers/handleOrderUpdate";

export async function handler(
  req: APIGatewayEvent
): Promise<APIGatewayProxyResult> {
  if (!verifySignaturev2(req)) {
    console.error("invalid signature or invalid body");
    console.log(req);
    return {
      statusCode: 200, // Avoid Visma Connect retrying these requests
      body: JSON.stringify({ status: "invalid signature" }, null, 2),
    };
  }

  const body = req.body
    ? BusinessNXTWebhookPayloadSchema.safeParse(JSON.parse(req.body))
    : null;

  if (!body?.success) {
    console.error("invalid body");
    return {
      statusCode: 200,
      body: JSON.stringify({ status: "invalid body" }, null, 2),
    };
  }

  const { data } = body;

  switch (data.tableIdentifier) {
    case "Order":
      await handleOrderUpdate(data);
      break;
    case "Product":
      await handleProductUpdate(data);
      break;
  }

  const headers = getVismaConnectHeaders(req.headers);

  // let's use the notificationTimestamp to calculate the duration of the
  // request from the time it was sent to the time it was processed
  console.info(headers.eventId, {
    ...headers,
    duration: Date.now() - headers.notificationTimestamp,
    body,
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ ok: true }),
  };
}
