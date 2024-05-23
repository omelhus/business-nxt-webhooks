import { APIGatewayEvent } from "aws-lambda";
import { verifySignaturev2 } from "./utils/verifySignaturev2";

export async function handler(req: APIGatewayEvent) {
  if (!verifySignaturev2(req)) {
    console.error("invalid signature");
    console.log(req);
    return {
      statusCode: 200,
      body: JSON.stringify({ status: "invalid signature" }, null, 2),
    };
  }

  const eventType = req.headers["x-vwd-event-id"];
  const tenantId = req.headers["x-vwd-tenant-id"];
  const notificationId = req.headers["x-vwd-notification-id"];
  const notificationTimestamp = Number(
    req.headers["x-vwd-notification-timestamp"]
  );

  const body = req.body ? JSON.parse(req.body) : null;

  console.log(eventType, {
    delay: Date.now() - notificationTimestamp,
    tenantId,
    notificationTimestamp,
    notificationId,
    body,
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ status: "ok", test: 456 }, null, 2),
  };
}
