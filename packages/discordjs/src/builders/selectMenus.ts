import {
    ChannelSelectMenuBuilder,
    MentionableSelectMenuBuilder,
    RoleSelectMenuBuilder,
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder,
    UserSelectMenuBuilder,
} from "discord.js";
import type {
    ChannelSelectMenuOptions,
    MentionableSelectMenuOptions,
    RoleSelectMenuOptions,
    SelectMenuOptions,
    StringSelectMenuOptionOptionsWithEmoji,
    StringSelectMenuOptionOptionsWithLabel,
    StringSelectMenuOptions,
    UserSelectMenuOptions,
} from "../options";

export type SelectMenuBuilder =
    | ChannelSelectMenuBuilder
    | MentionableSelectMenuBuilder
    | RoleSelectMenuBuilder
    | StringSelectMenuBuilder
    | UserSelectMenuBuilder;

class StringSelectMenuOptionBuilders {
    public create(
        options:
            | StringSelectMenuOptionOptionsWithLabel
            | StringSelectMenuOptionOptionsWithEmoji,
    ): StringSelectMenuOptionBuilder {
        const builder = new StringSelectMenuOptionBuilder()
            .setDefault(options.default ?? false)
            .setValue(options.value);

        if (options.description) builder.setDescription(options.description);
        if (options.emoji) builder.setEmoji(options.emoji);
        if (options.label) builder.setLabel(options.label);

        return builder;
    }
}

export class SelectMenuBuilders {
    private readonly stringOptionsBuilders: StringSelectMenuOptionBuilders;

    constructor() {
        this.stringOptionsBuilders = new StringSelectMenuOptionBuilders();
    }

    public get options(): StringSelectMenuOptionBuilders {
        return this.stringOptionsBuilders;
    }

    private build<T extends SelectMenuBuilder, S extends SelectMenuOptions>(
        builder: T,
        options?: S,
    ): T {
        builder
            .setDisabled(options?.disabled ?? false)
            .setRequired(options?.required ?? false);

        if (options?.maxSelected) builder.setMaxValues(options.maxSelected);
        if (options?.minSelected) builder.setMinValues(options.minSelected);
        if (options?.placeholder) builder.setPlaceholder(options.placeholder);

        return builder;
    }

    public channel(
        customId: string,
        extraOptions?: ChannelSelectMenuOptions,
    ): ChannelSelectMenuBuilder {
        const builder = this.build(
            new ChannelSelectMenuBuilder().setCustomId(customId),
            extraOptions,
        );

        if (extraOptions?.allowedTypes)
            builder.setChannelTypes(extraOptions.allowedTypes);
        if (extraOptions?.defaultChannels)
            builder.setDefaultChannels(extraOptions.defaultChannels);

        return builder;
    }

    public mentionable(
        customId: string,
        extraOptions?: MentionableSelectMenuOptions,
    ): MentionableSelectMenuBuilder {
        const builder = this.build(
            new MentionableSelectMenuBuilder().setCustomId(customId),
            extraOptions,
        );

        if (extraOptions?.defaultRoles)
            builder.addDefaultRoles(extraOptions.defaultRoles);
        if (extraOptions?.defaultUsers)
            builder.addDefaultUsers(extraOptions.defaultUsers);
        if (extraOptions?.defaultValues)
            builder.addDefaultValues(extraOptions.defaultValues);

        return builder;
    }

    public role(
        customId: string,
        extraOptions?: RoleSelectMenuOptions,
    ): RoleSelectMenuBuilder {
        const builder = this.build(
            new RoleSelectMenuBuilder().setCustomId(customId),
            extraOptions,
        );

        if (extraOptions?.defaultRoles)
            builder.setDefaultRoles(extraOptions.defaultRoles);

        return builder;
    }

    public string(
        customId: string,
        extraOptions: StringSelectMenuOptions,
    ): StringSelectMenuBuilder {
        return this.build(
            new StringSelectMenuBuilder()
                .setCustomId(customId)
                .setOptions(extraOptions.values),
            extraOptions,
        );
    }

    public user(
        customId: string,
        extraOptions?: UserSelectMenuOptions,
    ): UserSelectMenuBuilder {
        const builder = this.build(
            new UserSelectMenuBuilder().setCustomId(customId),
            extraOptions,
        );

        if (extraOptions?.defaultUsers)
            builder.setDefaultUsers(extraOptions.defaultUsers);

        return builder;
    }
}
