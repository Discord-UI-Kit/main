import {
    ButtonBuilder,
    ButtonStyle,
    type ComponentEmojiResolvable,
    type Snowflake,
} from "discord.js";
import type { UiClient, UiEmojiBase } from "..";

export interface ButtonOptions {
    disabled?: boolean;
    label?: string;
    emoji?: ComponentEmojiResolvable;
}

export type LabelOrOptions = string | Partial<ButtonOptions>;

export class ButtonBuilders {
    private readonly client: UiClient;

    constructor(client: UiClient) {
        this.client = client;
    }

    private bareBase(style: ButtonStyle): ButtonBuilder {
        return new ButtonBuilder().setStyle(style);
    }

    private base(customId: string, style: ButtonStyle): ButtonBuilder {
        return this.bareBase(style).setCustomId(customId);
    }

    private bareBuild(
        style: ButtonStyle,
        options: LabelOrOptions,
    ): ButtonBuilder {
        const isObj = typeof options === "object";

        if (isObj && !options.label && !options.emoji)
            throw new Error("One of label or emoji must be defined at least!");

        const builder = this.bareBase(style);

        if (!isObj) {
            builder.setLabel(options);
            return builder;
        }

        if (options.label) builder.setLabel(options.label);
        if (options.emoji) builder.setEmoji(options.emoji);

        return builder;
    }

    private build(
        customId: string,
        style: ButtonStyle,
        options: LabelOrOptions,
    ): ButtonBuilder {
        const isObj = typeof options === "object";

        if (isObj && !options.label && !options.emoji)
            throw new Error("One of label or emoji must be defined at least!");

        const builder = this.base(customId, style);

        if (!isObj) builder.setLabel(options).setDisabled(false);
        else {
            if (options.label) builder.setLabel(options.label);
            if (options.emoji) builder.setEmoji(options.emoji);

            builder.setDisabled(options.disabled ?? false);
        }

        return builder;
    }

    private get emojis(): UiEmojiBase {
        return this.client.options.emojis!;
    }

    public primary(customId: string, options: LabelOrOptions): ButtonBuilder {
        return this.build(customId, ButtonStyle.Primary, options);
    }

    public secondary(customId: string, options: LabelOrOptions): ButtonBuilder {
        return this.build(customId, ButtonStyle.Secondary, options);
    }

    public danger(customId: string, options: LabelOrOptions): ButtonBuilder {
        return this.build(customId, ButtonStyle.Danger, options);
    }

    public success(customId: string, options: LabelOrOptions): ButtonBuilder {
        return this.build(customId, ButtonStyle.Success, options);
    }

    public link(
        url: string,
        options: string | Pick<ButtonOptions, "emoji" | "label">,
    ): ButtonBuilder {
        return this.bareBuild(ButtonStyle.Link, options).setURL(url);
    }

    public premium(
        skuId: Snowflake,
        options: string | Pick<ButtonOptions, "emoji" | "label">,
    ): ButtonBuilder {
        return this.bareBuild(ButtonStyle.Premium, options).setSKUId(skuId);
    }

    public withEmoji(
        customId: string,
        emoji: ComponentEmojiResolvable,
        style: ButtonStyle,
        options?: LabelOrOptions | null,
    ): ButtonBuilder {
        const builder = this.base(customId, style).setEmoji(emoji);

        if (!options) return builder;

        const isOptionsObject = typeof options === "object";

        if (!isOptionsObject) {
            builder.setLabel(options);
            return builder;
        }

        builder.setDisabled(options.disabled ?? false);

        return options.label ? builder.setLabel(options.label) : builder;
    }

    public checkMarked(
        customId: string,
        options?: LabelOrOptions | null,
        style: ButtonStyle = ButtonStyle.Success,
    ): ButtonBuilder {
        return this.withEmoji(customId, this.emojis.checkMark, style, options);
    }

    public crossed(
        customId: string,
        options?: LabelOrOptions | null,
        style: ButtonStyle = ButtonStyle.Danger,
    ): ButtonBuilder {
        return this.withEmoji(customId, this.emojis.crossMark, style, options);
    }
}
