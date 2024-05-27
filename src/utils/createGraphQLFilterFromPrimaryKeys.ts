import { toCamelCase } from "./toCamelCase";

/** Get all primary keys from a list of objects.
 *  The primary keys are in an array of objects like [{ OrderNo: 1 }, { LineNo: 2 }],
 *  and we want to merge them into a single object like { OrderNo: 1, LineNo: 2 }.
 */
export function getPrimaryKeys(
  primaryKeys: Record<string, string | number>[]
): Record<string, string | number> {
  return primaryKeys.reduce((acc, primaryKey) => {
    return {
      ...acc,
      ...primaryKey,
    };
  }, {});
}

/** Create a graphql filter based on the primary keys */
export function createGraphQLFilterFromPrimaryKeys(
  primaryKeys: Record<string, string | number>[]
) {
  return {
    _and: primaryKeys.flatMap((primaryKey: Record<string, string | number>) => {
      return Object.entries(primaryKey).map(([key, value]) => ({
        [toCamelCase(key)]: { _eq: value },
      }));
    }),
  };
}
