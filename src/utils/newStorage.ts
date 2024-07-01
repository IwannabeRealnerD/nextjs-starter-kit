export type StorageScheme = Record<
  string,
  | {
      type: "boolean";
    }
  | {
      type: "enum";
      options: string[];
    }
  | {
      type: "string";
    }
  | {
      type: "number";
    }
  | {
      type: "date";
      format?: string;
    }
  | {
      type: "array";
      itemType: "boolean" | "string" | "number" | "date";
    }
>;

const storageScheme = {
  accessToken: { type: "string" },
  checkedList: { itemType: "string", type: "array" },
  refreshToken: { type: "string" },
  userUUID: { type: "number" },
} as const satisfies StorageScheme;

type Aggregate<T extends StorageScheme> = {
  [K in keyof T]: T[K]["type"] extends "boolean"
    ? boolean
    : T[K] extends { readonly type: "array" }
      ? T[K]["itemType"] extends "boolean"
        ? boolean[]
        : T[K]["itemType"] extends "string"
          ? string[]
          : T[K]["itemType"] extends "number"
            ? number[]
            : T[K]["itemType"] extends "date"
              ? Date[]
              : never
      : T[K]["type"] extends "string"
        ? string
        : T[K]["type"] extends "number"
          ? number
          : T[K]["type"] extends "date"
            ? Date
            : never;
};

const typeCaster = {
  array: (value: string, type: "boolean" | "string" | "number" | "date") => {
    const deSerializedValue = JSON.parse(value);
    if (!Array.isArray(deSerializedValue)) {
      throw new Error();
    }
    return deSerializedValue.map((item) => typeCaster[type](item)) as unknown as ReturnType<
      (typeof typeCaster)[typeof type]
    >;
  },
  boolean: (value: string) => Boolean(value),
  date: (value: string) => new Date(value),
  number: (value: string) => Number(value),
  string: (value: string) => value,
};

export const getStorageItem = <T extends keyof typeof storageScheme>(key: T) => {
  try {
    const item = localStorage.getItem(key);
    if (item === null) {
      return null;
    }
    const scheme = storageScheme[key];
    if (scheme.type === "array" && "itemType" in scheme) {
      return typeCaster.array(item, scheme.itemType) as Aggregate<typeof storageScheme>[T];
    }
    if (!("itemType" in scheme)) {
      return typeCaster[scheme.type](item) as Aggregate<typeof storageScheme>[T];
    }
    return null;
  } catch {
    localStorage.removeItem(key);
    return null;
  }
};
