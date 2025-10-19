import type { UiClient } from ".";

export class UiClientHelpers {
    private client: UiClient;

    constructor(client: UiClient) {
        this.client = client;
    }

    public ensureButtonsIncluded(): void {
        if (!this.client.options.include?.includes("Buttons"))
            throw new Error(
                "The UiClient instantiated doesn't have buttons included!",
            );
    }

    public ensureSelectMenusIncluded(): void {
        if (!this.client.options.include?.includes("SelectMenus"))
            throw new Error(
                "The UiClient instantiated doesn't have select menus included!",
            );
    }

    public ensureModalsIncluded(): void {
        if (!this.client.options.include?.includes("Modals"))
            throw new Error(
                "The UiClient instantiated doesn't have modals included!",
            );
    }

    public ensureEmbedsIncluded(): void {
        if (!this.client.options.include?.includes("Embeds"))
            throw new Error(
                "The UiClient instantiated doesn't have embeds included!",
            );
    }
}
