import { graphql } from "../gql";

export const Mutation_UpdateProduct = graphql(`
  mutation UpdateProduct(
    $cid: Int!
    $productNo: String!
    $input: Product_Input!
  ) {
    useCompany(no: $cid) {
      product_update(
        filter: { productNo: { _eq: $productNo } }
        value: $input
      ) {
        affectedRows
      }
    }
  }
`);
