import { createGraphQLClient } from "~/utils/createGraphQLClient";
import { BusinessNXTWebhookPayload } from "~/schema/BusinessNXTWebhookPayloadSchema";
import { Query_OrderLinesNamedRefForOrder } from "~/queries/Query_OrderLinesNamedRefForOrder";
import { getPrimaryKeys } from "~/utils/createGraphQLFilterFromPrimaryKeys";
import { Mutation_UpdateOrderLineDescription } from "~/queries/Mutation_UpdateOrderLineDescription";

export async function handleOrderUpdate(data: BusinessNXTWebhookPayload) {
  const primaryKeys = getPrimaryKeys(data.primaryKeys);
  console.log("Handle order update", primaryKeys.OrderNo, data.companyNo);
  const client = await createGraphQLClient();

  const orderLines = await client
    .request(Query_OrderLinesNamedRefForOrder, {
      orderNo: Number(primaryKeys.OrderNo),
      cid: data.companyNo,
    })
    .then((p) => p?.useCompany?.orderLine?.items);

  if (orderLines?.length) {
    const updates = orderLines
      .map((orderLine) => {
        if (orderLine?.transactionInformation1 && orderLine?.productNo) {
          const descr = `${orderLine.productNo} ${orderLine.transactionInformation1}`;
          if (descr !== orderLine.description && orderLine.lineNo) {
            return {
              cid: data.companyNo,
              orderNo: Number(primaryKeys.OrderNo),
              lineNo: orderLine.lineNo,
              description: descr,
            };
          }
        }
      })
      .filter((x) => x);

    const responses = await client.batchRequests(
      updates.map((u) => ({
        document: Mutation_UpdateOrderLineDescription,
        variables: u,
      }))
    );
    console.log(responses);
  }
}
