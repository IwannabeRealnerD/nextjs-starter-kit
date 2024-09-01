import { describe, beforeEach, test, expect } from "vitest";

import { GLOBAL_DATE_PREFIX } from "@/constants/date";
import {
  globalGetSessionStorage,
  globalRemoveSessionStorage,
  globalSetSessionStorage,
} from "@/utils/globalSessionStorage";
import { SessionStorage } from "@/utils/globalSessionStorage/type";

describe("sharedSessionStorage", () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  test("should set string primitive value", () => {
    globalSetSessionStorage("accessToken", "testToken");
    const result = sessionStorage.getItem("accessToken");
    expect(result).toBe('"testToken"');
  });
  test("should set date value with __date__ prefix", () => {
    const date = new Date();
    globalSetSessionStorage("testDate", date);
    const result = JSON.parse(sessionStorage.getItem("testDate") as string);
    const expectedResult = `${GLOBAL_DATE_PREFIX}${date.toISOString()}`;
    expect(result).toEqual(expectedResult);
  });
  test("should get date value", () => {
    const date = new Date();
    const setValue = JSON.stringify(`${GLOBAL_DATE_PREFIX}${date.toISOString()}`);
    sessionStorage.setItem("testDate", setValue);
    const expectedValue = date;
    const result = globalGetSessionStorage("testDate");
    expect(result).toEqual(expectedValue);
  });

  test("should set nested object", () => {
    const date = new Date();
    const setValue = {
      lv1: {
        lv2: {
          date,
          null: null,
          number: 1,
          string: "string",
          undefined,
        },
      },
    };
    globalSetSessionStorage("nestedExample", setValue);
    const expectedValue = {
      lv1: {
        lv2: {
          ...setValue.lv1.lv2,
          date: `${GLOBAL_DATE_PREFIX}${date.toISOString()}`,
        },
      },
    };
    const result = JSON.parse(sessionStorage.getItem("nestedExample") as string);
    expect(result).toEqual(expectedValue);
  });

  test("should get nested object", () => {
    const date = new Date();
    const expectedValue = {
      lv1: {
        lv2: {
          date,
          null: null,
          number: 1,
          string: "string",
          undefined,
        },
      },
    };
    const setValue = {
      lv1: {
        lv2: {
          ...expectedValue.lv1.lv2,
          date: `${GLOBAL_DATE_PREFIX}${date.toISOString()}`,
        },
      },
    };
    sessionStorage.setItem("nestedExample", JSON.stringify(setValue));
    const result = globalGetSessionStorage("nestedExample");
    expect(result).toEqual(expectedValue);
  });

  test("should remove value", () => {
    sessionStorage.setItem("accessToken", "value");
    globalRemoveSessionStorage("accessToken");
    const result = sessionStorage.getItem("accessToken");
    expect(result).toBeNull();
  });

  test("should return null when querying non-existent key", () => {
    const result = globalGetSessionStorage("nonExistentKey" as keyof SessionStorage);
    expect(result).toBeNull();
  });
});
