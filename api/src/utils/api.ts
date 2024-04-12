const APIResources = {
  Quotes: "quotes",
  Stoics: "stoics",
} as const;

type APIResource = (typeof APIResources)[keyof typeof APIResources];

function addResourceType<T extends Object>(
  type: APIResource,
  data: T | T[]
): (T & { type: APIResource }) | Array<T & { type: APIResource }> {
  if (Array.isArray(data)) {
    return data.map((obj) => {
      return {
        type,
        ...obj,
      };
    });
  }
  return {
    type,
    ...data,
  };
}

export { addResourceType };
