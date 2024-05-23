import { APIGatewayEvent } from "aws-lambda";
import { verifySignaturev2 } from "./utils/verifySignaturev2";
import { getVismaConnectHeaders } from "./utils/getVismaConnectHeaders";
import { createGraphQLFilterFromPrimaryKeys } from "./utils/createGraphQLFilterFromPrimaryKeys";
import { BusinessNXTWebhookPayloadSchema } from "./schema/BusinessNXTWebhookPayloadSchema";
import { handleProductUpdate } from "./handlers/handleProductUpdate";
import { handleOrderUpdate } from "./handlers/handleOrderUpdate";

export async function handler(req: APIGatewayEvent) {
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

  if (!body || !body.success) {
    console.error("invalid body");
    return {
      statusCode: 200,
      body: JSON.stringify({ status: "invalid body" }, null, 2),
    };
  }

  const { data } = body;
  const connect_info = getVismaConnectHeaders(req.headers);
  const graphQlFilter = createGraphQLFilterFromPrimaryKeys(data.primaryKeys);

  switch (data.tableIdentifier) {
    case "Product":
      await handleProductUpdate(graphQlFilter, data);
      break;
    case "Order":
      await handleOrderUpdate(data);
      break;
  }

  console.info(
    connect_info.eventId,
    {
      ...connect_info,
      duration: Date.now() - connect_info.notificationTimestamp,
      body,
    },
    JSON.stringify(graphQlFilter, null, 2)
  );

  return {
    statusCode: 200,
    body: JSON.stringify({ ok: true }),
  };
}
