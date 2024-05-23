import { APIGatewayEvent } from "aws-lambda";
import { verifySignaturev2 } from "./utils/verifySignaturev2";
import { getVismaConnectHeaders } from "./utils/getVismaConnectHeaders";

export async function handler(req: APIGatewayEvent) {
  if (!verifySignaturev2(req)) {
    console.error("invalid signature");
    console.log(req);
    return {
      statusCode: 200,
      body: JSON.stringify({ status: "invalid signature" }, null, 2),
    };
  }

  const connect_info = getVismaConnectHeaders(req.headers);
  const body = req.body ? JSON.parse(req.body) : null;

  console.log(connect_info.eventId, {
    ...connect_info,
    duration: Date.now() - connect_info.notificationTimestamp,
    body,
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ ok: true }),
  };
}
