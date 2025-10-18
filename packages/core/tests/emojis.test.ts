import { beforeAll, describe, expect, it } from "bun:test";
import { UiCore, UiEmojiBase } from "../src/index";

describe("Base Emojis Suite", () => {
    let core: UiCore;

    beforeAll(() => {
        core = new UiCore();
    });

    it("Should expose the default emojis", () => {
        const emojis = core.emojis;

        expect(emojis.checkMark).toBe("✅");
        expect(emojis.crossMark).toBe("❌");
    });

    it("Should allow overrides", () => {
        class CustomEmojis extends UiEmojiBase {
            public override get checkMark() {
                return ":test_check_mark:";
            }

            public override get crossMark() {
                return ":test_cross_mark:";
            }
        }

        const customCore = new UiCore({ emojis: new CustomEmojis() });
        const emojis = customCore.emojis;

        expect(emojis.checkMark).toBe(":test_check_mark:");
        expect(emojis.crossMark).toBe(":test_cross_mark:");

        // Ensure we didn't override the left arrow.
        expect(emojis.leftArrow).toBe("⬅️");
    });
});
