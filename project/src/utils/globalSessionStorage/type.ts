export type SessionStorage = {
  accessToken: string;
  refreshToken: string;
  userUUID: string;
  example: {
    foo: string;
    bar: number;
  };
  nestedExample: {
    lv1: {
      lv2: {
        date: Date;
        string: string;
        number: number;
        null: null;
        undefined: undefined;
      };
    };
  };
  testDate: Date;
};
