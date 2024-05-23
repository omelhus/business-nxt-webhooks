export function toCamelCase(str: string) {
  // replace the first letter with lowercase
  return str.charAt(0).toLowerCase() + str.slice(1);
}
