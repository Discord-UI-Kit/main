import {
    EmbedBuilder,
    type ColorResolvable,
    type EmbedAuthorOptions,
    type EmbedField,
    type EmbedFooterOptions,
} from "discord.js";
import type { UiClient } from "..";

export interface EmbedOptions {
    color?: ColorResolvable | null;
    title?: string | null;
    description?: string | null;
    footer?: EmbedFooterOptions | null;
    fields?: EmbedField[];
    timestamp?: Date | number | null;
    author?: EmbedAuthorOptions | null;
    image?: string | null;
    thumbnail?: string | null;
}

export type EmbedOptionsWithoutColorAndTitle = Pick<
    EmbedOptions,
    | "author"
    | "description"
    | "fields"
    | "footer"
    | "image"
    | "timestamp"
    | "thumbnail"
>;

export class EmbedBuilders {
    private readonly client: UiClient;

    constructor(client: UiClient) {
        this.client = client;
    }

    private get colors() {
        return this.client.options.colors!;
    }

    public info(
        title: string | null = "Information",
        extraOptions?: EmbedOptionsWithoutColorAndTitle,
    ): EmbedBuilder {
        return this.custom({
            color: this.colors.info,
            title,
            ...extraOptions,
        });
    }

    public warning(
        title: string | null = "Warning",
        extraOptions?: EmbedOptionsWithoutColorAndTitle,
    ): EmbedBuilder {
        return this.custom({
            color: this.colors.warning,
            title,
            ...extraOptions,
        });
    }

    public danger(
        title: string | null = "Danger",
        extraOptions?: EmbedOptionsWithoutColorAndTitle,
    ): EmbedBuilder {
        return this.custom({
            color: this.colors.danger,
            title,
            ...extraOptions,
        });
    }

    public error(
        title: string | null = "Error",
        extraOptions?: EmbedOptionsWithoutColorAndTitle,
    ): EmbedBuilder {
        return this.custom({
            color: this.colors.error,
            title,
            ...extraOptions,
        });
    }

    public success(
        title: string | null = "Success",
        extraOptions?: EmbedOptionsWithoutColorAndTitle,
    ): EmbedBuilder {
        return this.custom({
            color: this.colors.success,
            title,
            ...extraOptions,
        });
    }

    public custom(options: EmbedOptions): EmbedBuilder {
        const builder = new EmbedBuilder();

        if (options.author) builder.setAuthor(options.author);
        if (options.color) builder.setColor(options.color);
        if (options.description) builder.setDescription(options.description);
        if (options.fields) builder.setFields(options.fields);
        if (options.footer) builder.setFooter(options.footer);
        if (options.image) builder.setImage(options.image);
        if (options.thumbnail) builder.setThumbnail(options.thumbnail);
        if (options.timestamp) builder.setTimestamp(options.timestamp);
        if (options.title) builder.setTitle(options.title);

        return builder;
    }
}
