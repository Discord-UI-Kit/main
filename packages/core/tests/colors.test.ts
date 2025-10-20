import { beforeAll, describe, expect, it } from "bun:test";
import { UiCore, UiColorsBase, type Color } from "../src/index";

describe("Core Colors Suite", () => {
    let core: UiCore;
    let configuredCore: UiCore;
    let customColors: UiColorsBase;

    beforeAll(() => {
        core = new UiCore();

        class CustomColors extends UiColorsBase {
            public override get info(): Color {
                return 0x00ff00;
            }
        }

        customColors = new CustomColors();

        configuredCore = new UiCore<CustomColors>({
            colors: customColors,
        });
    });

    it("Should expose the default colors", () => {
        const otherCore = new UiCore();

        // Step 1, ensure the defaults match another client.
        expect(core.colors.info).toBe(otherCore.colors.info);
        expect(core.colors.danger).toBe(otherCore.colors.danger);
        expect(core.colors.error).toBe(otherCore.colors.error);
        expect(core.colors.neutral).toBe(otherCore.colors.neutral);
        expect(core.colors.success).toBe(otherCore.colors.success);
        expect(core.colors.warning).toBe(otherCore.colors.warning);

        // Step 2, ensure if we configure a client, the defaults aren't the same.
        expect(core.colors.info).not.toBe(configuredCore.colors.info);
    });

    it("Should allow overrides", () => {
        const otherConfiguredCore = new UiCore({
            colors: customColors,
        });

        expect(configuredCore.colors.info).toBe(
            otherConfiguredCore.colors.info,
        );
        expect(configuredCore.colors.danger).toBe(core.colors.danger);
        expect(configuredCore.colors.error).toBe(core.colors.error);
        expect(configuredCore.colors.neutral).toBe(core.colors.neutral);
        expect(configuredCore.colors.success).toBe(core.colors.success);
        expect(configuredCore.colors.warning).toBe(core.colors.warning);
    });
});
