export const safeParse = (data: string) => {
  try {
    return JSON.parse(data);
  } catch (error) {
    return null;
  }
};

/**
 * Serialize the given data to a JSON string in a safe manner.
 *
 * @param {any} data - The data to be serialized.
 * @return {string} The serialized JSON string.
 */
export const safeStringify = (data: any) => {
  try {
    if (!data) {
      return '';
    }
    return JSON.stringify(data);
  } catch (error) {
    return '';
  }
};
