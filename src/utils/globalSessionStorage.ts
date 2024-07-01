type GlobalSessionStorageDef = {
  accessToken: string;
  refreshToken: string;
  userUUID: string;
  example: {
    foo: string;
    bar: number;
  };
};

export const globalGetSessionStorage = <K extends keyof GlobalSessionStorageDef>(
  key: K
): GlobalSessionStorageDef[K] | null => {
  const item = sessionStorage.getItem(key);
  return item != null ? (JSON.parse(item) as GlobalSessionStorageDef[K]) : null;
};

export const globalSetSessionStorage = <K extends keyof GlobalSessionStorageDef>(
  key: K,
  value: GlobalSessionStorageDef[K]
) => {
  sessionStorage.setItem(key, JSON.stringify(value));
};

export const globalRemoveSessionStorage = (key: keyof GlobalSessionStorageDef) => {
  sessionStorage.removeItem(key);
};
