/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation UpdateDescriptionForOrderLine(\n    $cid: Int!\n    $orderNo: Int!\n    $lineNo: Int!\n    $description: String!\n  ) {\n    useCompany(no: $cid) {\n      orderLine_update(\n        filter: {\n          _and: [\n            { orderNo: { _eq: $orderNo } }\n            { lineNo: { _eq: $lineNo } }\n            { description: { _not_eq: $description } }\n          ]\n        }\n        value: { description: $description }\n      ) {\n        affectedRows\n      }\n    }\n  }\n": types.UpdateDescriptionForOrderLineDocument,
    "\n  mutation UpdateProduct(\n    $cid: Int!\n    $productNo: String!\n    $input: Product_Input!\n  ) {\n    useCompany(no: $cid) {\n      product_update(\n        filter: { productNo: { _eq: $productNo } }\n        value: $input\n      ) {\n        affectedRows\n      }\n    }\n  }\n": types.UpdateProductDocument,
    "\n  query OrderLinesNamedRef($cid: Int!, $orderNo: Int!) {\n    useCompany(no: $cid) {\n      orderLine(\n        filter: {\n          _and: [\n            { orderNo: { _eq: $orderNo } }\n            { productNo: { _eq: \"ref\" } }\n            { transactionInformation1: { _gt: \"\" } }\n          ]\n        }\n      ) {\n        items {\n          orderNo\n          lineNo\n          productNo\n          description\n          transactionInformation1\n        }\n      }\n    }\n  }\n": types.OrderLinesNamedRefDocument,
    "\n  query Query_Product($cid: Int!, $filter: FilterExpression_Product) {\n    useCompany(no: $cid) {\n      product(filter: $filter) {\n        items {\n          productNo\n          description\n          information1\n          information2\n          information3\n          changedByUser\n        }\n      }\n    }\n  }\n": types.Query_ProductDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateDescriptionForOrderLine(\n    $cid: Int!\n    $orderNo: Int!\n    $lineNo: Int!\n    $description: String!\n  ) {\n    useCompany(no: $cid) {\n      orderLine_update(\n        filter: {\n          _and: [\n            { orderNo: { _eq: $orderNo } }\n            { lineNo: { _eq: $lineNo } }\n            { description: { _not_eq: $description } }\n          ]\n        }\n        value: { description: $description }\n      ) {\n        affectedRows\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateDescriptionForOrderLine(\n    $cid: Int!\n    $orderNo: Int!\n    $lineNo: Int!\n    $description: String!\n  ) {\n    useCompany(no: $cid) {\n      orderLine_update(\n        filter: {\n          _and: [\n            { orderNo: { _eq: $orderNo } }\n            { lineNo: { _eq: $lineNo } }\n            { description: { _not_eq: $description } }\n          ]\n        }\n        value: { description: $description }\n      ) {\n        affectedRows\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateProduct(\n    $cid: Int!\n    $productNo: String!\n    $input: Product_Input!\n  ) {\n    useCompany(no: $cid) {\n      product_update(\n        filter: { productNo: { _eq: $productNo } }\n        value: $input\n      ) {\n        affectedRows\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateProduct(\n    $cid: Int!\n    $productNo: String!\n    $input: Product_Input!\n  ) {\n    useCompany(no: $cid) {\n      product_update(\n        filter: { productNo: { _eq: $productNo } }\n        value: $input\n      ) {\n        affectedRows\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query OrderLinesNamedRef($cid: Int!, $orderNo: Int!) {\n    useCompany(no: $cid) {\n      orderLine(\n        filter: {\n          _and: [\n            { orderNo: { _eq: $orderNo } }\n            { productNo: { _eq: \"ref\" } }\n            { transactionInformation1: { _gt: \"\" } }\n          ]\n        }\n      ) {\n        items {\n          orderNo\n          lineNo\n          productNo\n          description\n          transactionInformation1\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query OrderLinesNamedRef($cid: Int!, $orderNo: Int!) {\n    useCompany(no: $cid) {\n      orderLine(\n        filter: {\n          _and: [\n            { orderNo: { _eq: $orderNo } }\n            { productNo: { _eq: \"ref\" } }\n            { transactionInformation1: { _gt: \"\" } }\n          ]\n        }\n      ) {\n        items {\n          orderNo\n          lineNo\n          productNo\n          description\n          transactionInformation1\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Query_Product($cid: Int!, $filter: FilterExpression_Product) {\n    useCompany(no: $cid) {\n      product(filter: $filter) {\n        items {\n          productNo\n          description\n          information1\n          information2\n          information3\n          changedByUser\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query Query_Product($cid: Int!, $filter: FilterExpression_Product) {\n    useCompany(no: $cid) {\n      product(filter: $filter) {\n        items {\n          productNo\n          description\n          information1\n          information2\n          information3\n          changedByUser\n        }\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;