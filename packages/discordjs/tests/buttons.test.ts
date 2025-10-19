import { beforeAll, describe, expect, it } from "bun:test";
import { UiClient } from "../src";
import { ButtonBuilder, ButtonStyle } from "discord.js";

describe("Buttons Test Suite", () => {
    let client: UiClient;

    beforeAll(() => {
        client = new UiClient();
    });

    it("Creates a basic primary button", () => {
        const button = client.buttons.primary("test", "My Test Button");

        expect(button).toBeInstanceOf(ButtonBuilder);
        expect(button.data.style).toBe(ButtonStyle.Primary);
    });

    it("Creates a basic secondary button", () => {
        const button = client.buttons.secondary("test", "My Test Button");

        expect(button).toBeInstanceOf(ButtonBuilder);
        expect(button.data.style).toBe(ButtonStyle.Secondary);
    });

    it("Creates a basic danger button", () => {
        const button = client.buttons.danger("test", "My Test Button");

        expect(button).toBeInstanceOf(ButtonBuilder);
        expect(button.data.style).toBe(ButtonStyle.Danger);
    });

    it("Creates a basic success button", () => {
        const button = client.buttons.success("test", "My Test Button");

        expect(button).toBeInstanceOf(ButtonBuilder);
        expect(button.data.style).toBe(ButtonStyle.Success);
    });

    it("Creates a basic link button", () => {
        const button = client.buttons.link(
            "https://example.com",
            "My Test Button",
        );

        expect(button).toBeInstanceOf(ButtonBuilder);
        expect(button.data.style).toBe(ButtonStyle.Link);
    });

    it("Creates a basic premium button", () => {
        const button = client.buttons.premium(
            "697414293712273408",
            "My Test Button",
        );

        expect(button).toBeInstanceOf(ButtonBuilder);
        expect(button.data.style).toBe(ButtonStyle.Premium);
    });

    it("Throws when buttons is not included", () => {
        const customClient = new UiClient({
            include: [],
        });

        expect(() => customClient.buttons).toThrow();
    });

    it("Doesn't throw when buttons is included", () => {
        expect(() => client.buttons).not.toThrow();
    });
});
