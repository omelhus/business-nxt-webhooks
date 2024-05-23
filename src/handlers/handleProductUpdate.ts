import { createGraphQLClient } from "../utils/createGraphQLClient.js";
import { Query_Product } from "../queries/Query_Product";
import { Mutation_UpdateProduct } from "../queries/Mutation_UpdateProduct";
import { BusinessNXTWebhookPayload } from "../schema/BusinessNXTWebhookPayloadSchema";
import { FilterExpression_Product } from "../gql/graphql";

export async function handleProductUpdate(
  graphQlFilter: FilterExpression_Product,
  data: BusinessNXTWebhookPayload
) {
  const visma_client_id = process.env.VISMA_CLIENT_ID;
  const client = await createGraphQLClient();
  const product = await client
    .request(Query_Product, {
      filter: graphQlFilter,
      cid: data.companyNo,
    })
    .then((p) => p?.useCompany?.product?.items?.[0]);

  if (product?.productNo && product.changedByUser !== visma_client_id) {
    const response = await client.request(Mutation_UpdateProduct, {
      cid: data.companyNo,
      productNo: product.productNo,
      input: {
        information2: `${product.description} ${product.information1}`,
      },
    });
    console.log(response);
  } else {
    console.log("changed by me. skipping update.");
  }
}
