import { graphql } from "../gql";

export const Query_OrderLinesNamedRefForOrder = graphql(`
  query OrderLinesNamedRef($cid: Int!, $orderNo: Int!) {
    useCompany(no: $cid) {
      orderLine(
        filter: {
          _and: [
            { orderNo: { _eq: $orderNo } }
            { productNo: { _eq: "ref" } }
            { transactionInformation1: { _gt: "" } }
          ]
        }
      ) {
        items {
          orderNo
          lineNo
          productNo
          description
          transactionInformation1
        }
      }
    }
  }
`);
