import { createGraphQLClient } from "~/utils/createGraphQLClient.js";
import { BusinessNXTWebhookPayload } from "~/schema/BusinessNXTWebhookPayloadSchema.js";
import { Query_OrderLinesNamedRefForOrder } from "~/queries/Query_OrderLinesNamedRefForOrder.js";
import { getPrimaryKeys } from "~/utils/createGraphQLFilterFromPrimaryKeys.js";
import { Mutation_UpdateOrderLineDescription } from "~/queries/Mutation_UpdateOrderLineDescription.js";

export async function handleOrderUpdate(data: BusinessNXTWebhookPayload) {
  const client = await createGraphQLClient();
  const primaryKeys = getPrimaryKeys(data.primaryKeys);

  const orderLines = await client
    .request(Query_OrderLinesNamedRefForOrder, {
      orderNo: Number(primaryKeys.OrderNo),
      cid: data.companyNo,
    })
    .then((p) => p?.useCompany?.orderLine?.items);

  if (orderLines?.length) {
    for (const orderLine of orderLines) {
      if (orderLine?.transactionInformation1 && orderLine?.productNo) {
        const descr = `${orderLine.productNo} ${orderLine.transactionInformation1}`;
        if (descr !== orderLine.description && orderLine.lineNo) {
          const response = await client.request(
            Mutation_UpdateOrderLineDescription,
            {
              cid: data.companyNo,
              orderNo: Number(primaryKeys.OrderNo),
              lineNo: orderLine.lineNo,
              description: descr,
            }
          );
          console.log(response);
        }
      }
    }
  }
}
