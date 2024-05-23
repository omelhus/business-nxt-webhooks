import { APIGatewayEvent } from "aws-lambda";
import { verifySignaturev2 } from "./utils/verifySignaturev2";
import { getVismaConnectHeaders } from "./utils/getVismaConnectHeaders";
import { createConnectAccessToken } from "./utils/createConnectAccessToken";
import { toCamelCase } from "./utils/toCamelCase";
import { createGraphQLClient } from "./utils/createGraphQLClient.js";
import { Query_Product } from "./queries/Query_Product";
import { Mutation_UpdateProduct } from "./queries/Mutation_UpdateProduct";

export async function handler(req: APIGatewayEvent) {
  if (!verifySignaturev2(req)) {
    console.error("invalid signature");
    console.log(req);
    return {
      statusCode: 200, // this is a pro-tip to avoid connect retrying these requests
      body: JSON.stringify({ status: "invalid signature" }, null, 2),
    };
  }
  const visma_client_id = process.env.VISMA_CLIENT_ID;
  const connect_info = getVismaConnectHeaders(req.headers);

  const body = req.body ? JSON.parse(req.body) : null;

  const graphQlFilter = {
    _and: body?.primaryKeys.flatMap(
      (primaryKey: Record<string, string | number>) => {
        return Object.entries(primaryKey).map(([key, value]) => ({
          [toCamelCase(key)]: { _eq: value },
        }));
      }
    ),
  };

  const client = await createGraphQLClient();

  const product = await client
    .request(Query_Product, {
      filter: graphQlFilter,
      cid: body.companyNo,
    })
    .then((p) => p?.useCompany?.product?.items?.[0]);

  if (product && product.changedByUser !== visma_client_id) {
    const response = await client.request(Mutation_UpdateProduct, {
      cid: body.companyNo,
      productNo: product.productNo,
      input: {
        information2: `${product.description} ${product.information1}`,
      },
    });
    console.log(response);
  } else {
    console.log("changed by me. skipping update.");
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
