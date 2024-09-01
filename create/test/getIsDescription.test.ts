import { describe, test, expect, vi } from "vitest";

import { getIsDescription } from "@/utils/prompts/getIsDescription";
import prompts from "prompts";

describe("getWantedFeature()", () => {
  test("Return an wantedFeatures object with empty array if isFullFeature is false.", async () => {
    const wantedFeatures = await getIsDescription(true, false);
    expect(wantedFeatures).toEqual({ isDescription: true });
  });

  test("Return an wantedFeatures object with full features if isFullFeature is true.", async () => {
    const wantedFeatures = await getIsDescription(false, true);
    expect(wantedFeatures).toEqual({
      isDescription: false,
    });
  });

  test("Return an wantedFeatures object with the chosen features by user.", async () => {
    vi.mock("prompts", () => ({
      default: vi.fn().mockResolvedValue({
        isDescription: true,
      }),
    }));
    const wantedFeatures = await getIsDescription(
      undefined,
      undefined
    );
    expect(wantedFeatures).toEqual({
      isDescription: true,
    });
  });
});
