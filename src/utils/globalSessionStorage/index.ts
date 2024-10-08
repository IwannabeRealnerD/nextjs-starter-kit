import { GLOBAL_DATE_PREFIX } from "@/constants/date";

import { SessionStorage } from "./type";

export const globalGetSessionStorage = <T extends keyof SessionStorage>(key: T) => {
  const storageValue = sessionStorage.getItem(key);
  if (storageValue) {
    return JSON.parse(storageValue, (_, value) => {
      if (typeof value === "string" && value.startsWith(GLOBAL_DATE_PREFIX)) {
        return new Date(value.slice(GLOBAL_DATE_PREFIX.length));
      }
      return value;
    }) as SessionStorage[T];
  }
  return null;
};

export const globalSetSessionStorage = <K extends keyof SessionStorage>(key: K, value: SessionStorage[K]) => {
  const serializeDate = (deSerializedValue: SessionStorage[K]): unknown => {
    if (deSerializedValue instanceof Date) {
      return `${GLOBAL_DATE_PREFIX}${deSerializedValue.toISOString()}`;
    }
    if (deSerializedValue === null) {
      return null;
    }
    if (typeof deSerializedValue === "object") {
      return Object.fromEntries(
        Object.entries(deSerializedValue).map(([_key, _value]) => [_key, serializeDate(_value)])
      );
    }
    return deSerializedValue;
  };
  sessionStorage.setItem(key, JSON.stringify(serializeDate(value)));
};

export const globalRemoveSessionStorage = (key: keyof SessionStorage) => {
  sessionStorage.removeItem(key);
};
