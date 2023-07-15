/*
 * This helper can be used as a type safe filter to filter out all null and undefined values from an array
 */
export const nonNullable = <T>(value: T): value is NonNullable<T> => {
  return value !== null && value !== undefined;
};
