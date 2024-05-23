import { toCamelCase } from "./toCamelCase";

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
