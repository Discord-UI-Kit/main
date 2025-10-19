import { beforeAll, describe, expect, it } from "bun:test";
import { Includes, UiClient, UiColorsBase, type Color } from "../src/index";

describe("Allowed Test Suite", () => {
    let client: UiClient;

    beforeAll(() => {
        client = new UiClient();
    });

    it("Has the default includes", () => {
        class CustomColors extends UiColorsBase {
            public override get info(): Color {
                return 0x00ffff;
            }
        }

        expect(client.options.include).toBeArray();
        expect(client.options.include).toBeArrayOfSize(4);

        // Seeing if a client without include defined breaks.
        const customClient = new UiClient({
            colors: new CustomColors(),
        });

        expect(customClient.options.include).toBeArray();
        expect(customClient.options.include).toBeArrayOfSize(4);
    });

    it("Has correct include overrides", () => {
        const customClient = new UiClient({
            include: [Includes.Buttons],
        });

        expect(customClient.options.include).toBeArray();
        expect(customClient.options.include).toBeArrayOfSize(1);
    });
});
