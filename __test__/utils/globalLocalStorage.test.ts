import { describe, beforeEach, test, expect } from "vitest";

import { GLOBAL_DATE_PREFIX } from "@/constants/date";
import { globalGetLocalStorage, globalRemoveLocalStorage, globalSetLocalStorage } from "@/utils/globalLocalStorage";
import { LocalStorage } from "@/utils/globalLocalStorage/type";

describe("sharedLocalStorage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("should set string primitive value", () => {
    globalSetLocalStorage("accessToken", "testToken");
    const result = localStorage.getItem("accessToken");
    expect(result).toBe('"testToken"');
  });
  test("should set date value with __date__ prefix", () => {
    const date = new Date();
    globalSetLocalStorage("testDate", date);
    const result = JSON.parse(localStorage.getItem("testDate") as string);
    const expectedResult = `${GLOBAL_DATE_PREFIX}${date.toISOString()}`;
    expect(result).toEqual(expectedResult);
  });
  test("should get date value", () => {
    const date = new Date();
    const setValue = JSON.stringify(`${GLOBAL_DATE_PREFIX}${date.toISOString()}`);
    localStorage.setItem("testDate", setValue);
    const expectedValue = date;
    const result = globalGetLocalStorage("testDate");
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
    globalSetLocalStorage("nestedExample", setValue);
    const expectedValue = {
      lv1: {
        lv2: {
          ...setValue.lv1.lv2,
          date: `${GLOBAL_DATE_PREFIX}${date.toISOString()}`,
        },
      },
    };
    const result = JSON.parse(localStorage.getItem("nestedExample") as string);
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
    localStorage.setItem("nestedExample", JSON.stringify(setValue));
    const result = globalGetLocalStorage("nestedExample");
    expect(result).toEqual(expectedValue);
  });

  test("should remove value", () => {
    localStorage.setItem("accessToken", "value");
    globalRemoveLocalStorage("accessToken");
    const result = localStorage.getItem("accessToken");
    expect(result).toBeNull();
  });

  test("should return null when querying non-existent key", () => {
    const result = globalGetLocalStorage("nonExistentKey" as keyof LocalStorage);
    expect(result).toBeNull();
  });
});
