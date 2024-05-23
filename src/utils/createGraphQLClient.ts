import { GraphQLClient } from "graphql-request";
import { createConnectAccessToken } from "./createConnectAccessToken.js";

export async function createGraphQLClient() {
  const token = await createConnectAccessToken([
    "business-graphql-service-api:access-group-based",
  ]);
  return new GraphQLClient("https://business.visma.net/api/graphql-service", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
