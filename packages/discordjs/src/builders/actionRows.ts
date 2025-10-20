import {
    type MessageActionRowComponentBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
} from "discord.js";
import type { UiClient, UiEmojiBase } from "..";
import type { ButtonBuilders } from "./buttons";
import type { UiClientHelpers } from "../helpers";

export class PredefinedActionRows {
    private client: UiClient;
    private actionRowBuilders: ActionRowBuilders;
    private helpers: UiClientHelpers;

    constructor(client: UiClient, actionRowBuilders: ActionRowBuilders) {
        this.client = client;
        this.actionRowBuilders = actionRowBuilders;
        this.helpers = this.client.helpers;
    }

    private get emojis(): UiEmojiBase {
        return this.client.core.emojis;
    }

    private get buttons(): ButtonBuilders {
        return this.client.buttons;
    }

    private ensureButtonsIncluded(): void {
        this.helpers.ensureButtonsIncluded();
    }

    public onlyConfirm(
        customId: string,
        label: string | null = "Confirm",
    ): ActionRowBuilder<ButtonBuilder> {
        this.ensureButtonsIncluded();
        return this.actionRowBuilders.singleComponent(
            this.buttons.checkMarked(customId, label),
        );
    }

    public confirmCancel(
        customIdConfirm: string,
        customIdCancel: string,
        labelConfirm: string | null = "Confirm",
        labelCancel: string | null = "Cancel",
    ): ActionRowBuilder<ButtonBuilder> {
        this.ensureButtonsIncluded();
        return this.actionRowBuilders.multiComponents(
            this.buttons.checkMarked(customIdConfirm, labelConfirm),
            this.buttons.crossed(customIdCancel, labelCancel),
        );
    }

    public yesNo(
        customIdYes: string,
        customIdNo: string,
    ): ActionRowBuilder<ButtonBuilder> {
        this.ensureButtonsIncluded();
        return this.actionRowBuilders.multiComponents(
            this.buttons.checkMarked(customIdYes, "Yes"),
            this.buttons.crossed(customIdNo, "No"),
        );
    }

    public pagination(
        leftId: string,
        stopId: string,
        rightId: string,
        pageNumber: number = 1,
        maxPages: number = 2,
        buttonsStyle: ButtonStyle = ButtonStyle.Primary,
    ): ActionRowBuilder<ButtonBuilder> {
        this.ensureButtonsIncluded();
        return this.actionRowBuilders.multiComponents(
            this.buttons.withEmoji(leftId, this.emojis.leftArrow, buttonsStyle),
            this.buttons
                .withEmoji(stopId, this.emojis.stopIcon, buttonsStyle)
                .setDisabled(pageNumber === 1),
            this.buttons
                .withEmoji(rightId, this.emojis.rightArrow, buttonsStyle)
                .setDisabled(pageNumber === maxPages),
        );
    }
}

export class ActionRowBuilders {
    private client: UiClient;

    public readonly predefined: PredefinedActionRows | null;

    constructor(client: UiClient) {
        this.client = client;
        this.predefined = new PredefinedActionRows(this.client, this);
    }

    private base<
        T extends MessageActionRowComponentBuilder,
    >(): ActionRowBuilder<T> {
        return new ActionRowBuilder<T>();
    }

    public singleComponent<T extends MessageActionRowComponentBuilder>(
        component: T,
    ): ActionRowBuilder<T> {
        return this.base<T>().setComponents(component);
    }

    public multiComponents<T extends MessageActionRowComponentBuilder>(
        ...components: T[]
    ): ActionRowBuilder<T> {
        return this.base<T>().setComponents(components);
    }

    public disableAllComponents<T extends MessageActionRowComponentBuilder>(
        actionRow: ActionRowBuilder<T>,
    ): ActionRowBuilder<T> {
        actionRow.components.forEach((comp) => comp.setDisabled(true));

        return actionRow;
    }

    public enableAllComponents<T extends MessageActionRowComponentBuilder>(
        actionRow: ActionRowBuilder<T>,
    ): ActionRowBuilder<T> {
        actionRow.components.forEach((comp) => comp.setDisabled(false));

        return actionRow;
    }
}
