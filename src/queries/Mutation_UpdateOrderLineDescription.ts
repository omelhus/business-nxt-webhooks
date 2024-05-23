import { graphql } from "../gql";

export const Mutation_UpdateOrderLineDescription = graphql(`
  mutation UpdateDescriptionForOrderLine(
    $cid: Int!
    $orderNo: Int!
    $lineNo: Int!
    $description: String!
  ) {
    useCompany(no: $cid) {
      orderLine_update(
        filter: {
          _and: [
            { orderNo: { _eq: $orderNo } }
            { lineNo: { _eq: $lineNo } }
            { description: { _not_eq: $description } }
          ]
        }
        value: { description: $description }
      ) {
        affectedRows
      }
    }
  }
`);
