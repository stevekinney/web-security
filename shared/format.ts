type Data = Record<string, unknown>;
type ParamsAndValues = { params: string; values: string };

/**
 * Converts an object or array of objects into a string of values.
 */
export const toValues = (obj: Data | Data[]): string => {
  if (Array.isArray(obj)) {
    return obj.map(toValues).join(', ');
  }

  const values = Object.values(obj)
    .map((value) => (typeof value === 'string' ? `'${value}'` : value))
    .join(', ');

  return `(${values})`;
};

/**
 * Converts an object or array of objects into a string of parameters for a SQL query.
 */
export const toParams = (obj: Data | Data[]): string => {
  if (Array.isArray(obj)) {
    obj = obj[0];
  }

  const params = Object.keys(obj).join(', ');

  return `(${params})`;
};

/**
 * Converts an object or array of objects into a string of parameters and values for a SQL query.
 */
export function toParamsAndValues(
  obj: Data[],
  withID: boolean
): ParamsAndValues;
export function toParamsAndValues(obj: Data, withID: never): string;
export function toParamsAndValues(
  obj: Data | Data[],
  withID: boolean | undefined = false
): ParamsAndValues | string {
  if (Array.isArray(obj)) {
    if (withID) {
      obj = obj.map((o, i) => ({ id: i + 1, ...o })) as Data[];
    }

    return {
      params: toParams(obj),
      values: toValues(obj),
    };
  }

  return Object.entries(obj)
    .map(([key, value]) => `${key} = ${value}`)
    .join(', ');
}
