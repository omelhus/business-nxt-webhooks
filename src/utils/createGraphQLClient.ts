import { GraphQLClient } from "graphql-request";
import { createConnectAccessToken } from "./createConnectAccessToken";

export async function createGraphQLClient(env: any) {
  const token = await createConnectAccessToken(env, [
    "business-graphql-service-api:access-group-based",
  ]);
  return new GraphQLClient("https://business.visma.net/api/graphql-service", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
