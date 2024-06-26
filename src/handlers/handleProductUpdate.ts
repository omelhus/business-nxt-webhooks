import { createGraphQLClient } from "~/utils/createGraphQLClient.js";
import { Query_Product } from "~/queries/Query_Product";
import { Mutation_UpdateProduct } from "~/queries/Mutation_UpdateProduct";
import { BusinessNXTWebhookPayload } from "~/schema/BusinessNXTWebhookPayloadSchema";
import { createGraphQLFilterFromPrimaryKeys } from "~/utils/createGraphQLFilterFromPrimaryKeys";

export async function handleProductUpdate(data: BusinessNXTWebhookPayload) {
  const visma_client_id = process.env.VISMA_CLIENT_ID;
  const filter = createGraphQLFilterFromPrimaryKeys(data.primaryKeys);
  console.log("Handle product update", filter, data.companyNo);
  const client = await createGraphQLClient();
  const product = await client
    .request(Query_Product, {
      filter: filter,
      cid: data.companyNo,
    })
    .then((p) => p?.useCompany?.product?.items?.[0]);

  const inf2 = [
    product?.description?.substring(0, 10),
    product?.information1,
  ].join(" - ");

  if (
    product?.productNo &&
    // avoid updating the product if it was changed by the visma client
    product.changedByUser !== visma_client_id &&
    // avoid updating the product if the information2 is already correct
    product.information2 !== inf2
  ) {
    const response = await client.request(Mutation_UpdateProduct, {
      cid: data.companyNo,
      productNo: product.productNo,
      input: {
        information2: inf2,
      },
    });
    console.log(response);
  } else {
    console.log("changed by me. skipping update.");
  }
}
