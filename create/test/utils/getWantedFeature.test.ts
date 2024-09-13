import { describe, test, expect, vi } from "vitest";

import { getWantedFeature } from "@/utils/prompts/getWantedFeature";

describe("getWantedFeature()", () => {
  test("Return an wantedFeatures object with empty array if isFullFeature is false.", async () => {
    const wantedFeatures = await getWantedFeature(true, false);
    expect(wantedFeatures).toEqual({ wantedFeatures: [] });
  });

  test("Return an wantedFeatures object with full features if isFullFeature is true.", async () => {
    const wantedFeatures = await getWantedFeature(false, true);
    expect(wantedFeatures).toEqual({
      wantedFeatures: ["storybook", "github actions", "test code"],
    });
  });

  test("Return an wantedFeatures object with the chosen features by user.", async () => {
    vi.mock("prompts", () => ({
      default: vi.fn().mockResolvedValue({
        wantedFeatures: ["storybook", "github actions"],
      }),
    }));
    const wantedFeatures = await getWantedFeature(undefined, undefined);
    expect(wantedFeatures).toEqual({
      wantedFeatures: ["storybook", "github actions"],
    });
  });
});
