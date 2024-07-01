type GlobalLocalStorageDef = {
  accessToken: string;
  refreshToken: string;
  userUUID: string;
  example: {
    foo: string;
    bar: number;
  };
};

export const globalGetLocalStorage = <K extends keyof GlobalLocalStorageDef>(
  key: K
): GlobalLocalStorageDef[K] | null => {
  const item = localStorage.getItem(key);
  return item != null ? (JSON.parse(item) as GlobalLocalStorageDef[K]) : null;
};

export const globalSetLocalStorage = <K extends keyof GlobalLocalStorageDef>(
  key: K,
  value: GlobalLocalStorageDef[K]
) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const globalRemoveLocalStorage = (key: keyof GlobalLocalStorageDef) => {
  localStorage.removeItem(key);
};
