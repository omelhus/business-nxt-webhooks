import { graphql } from "../gql";

export const Query_Product = graphql(`
  query Query_Product($cid: Int!, $filter: FilterExpression_Product) {
    useCompany(no: $cid) {
      product(filter: $filter) {
        items {
          productNo
          description
          information1
          information2
          information3
          changedByUser
        }
      }
    }
  }
`);
