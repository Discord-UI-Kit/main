import type {
    ChannelType,
    Snowflake,
    APISelectMenuDefaultValue,
    SelectMenuDefaultValueType,
    StringSelectMenuOptionBuilder,
    ComponentEmojiResolvable,
    TextInputStyle,
} from "discord.js";

export interface SelectMenuOptions {
    disabled?: boolean;
    minSelected?: number;
    maxSelected?: number;
    placeholder?: string;
    required?: boolean;
}

export interface ChannelSelectMenuOptions extends SelectMenuOptions {
    allowedTypes?: ChannelType[];
    defaultChannels?: Snowflake[];
}

export interface MentionableSelectMenuOptions
    extends SelectMenuOptions,
        RoleSelectMenuOptions,
        UserSelectMenuOptions {
    defaultValues?: (
        | APISelectMenuDefaultValue<SelectMenuDefaultValueType.Role>
        | APISelectMenuDefaultValue<SelectMenuDefaultValueType.User>
    )[];
}

export interface RoleSelectMenuOptions extends SelectMenuOptions {
    defaultRoles?: Snowflake[];
}

export interface StringSelectMenuOptions extends SelectMenuOptions {
    values: StringSelectMenuOptionBuilder[];
}

export interface StringSelectMenuOptionOptions {
    value: string;
    description?: string;
    default?: boolean;
}

export interface StringSelectMenuOptionOptionsWithLabel
    extends StringSelectMenuOptionOptions {
    label: string;
    emoji?: ComponentEmojiResolvable;
}

export interface StringSelectMenuOptionOptionsWithEmoji
    extends StringSelectMenuOptionOptions {
    label?: string;
    emoji: ComponentEmojiResolvable;
}

export interface UserSelectMenuOptions extends SelectMenuOptions {
    defaultUsers?: Snowflake[];
}

export interface InputOptions {
    label: string;
    description?: string;
    placeholder?: string;
    required?: boolean;
    min?: number;
    max?: number;
}

export interface TextInputOptions extends InputOptions {
    style: TextInputStyle;
}

export interface ModalChannelSelectMenuOptions
    extends InputOptions,
        ChannelSelectMenuOptions {}

export interface ModalMentionableSelectMenuOptions
    extends InputOptions,
        MentionableSelectMenuOptions {}

export interface ModalRoleSelectMenuOptions
    extends InputOptions,
        RoleSelectMenuOptions {}

export interface ModalStringSelectMenuOptions
    extends InputOptions,
        StringSelectMenuOptions {}

export interface ModalUserSelectMenuOptions
    extends InputOptions,
        UserSelectMenuOptions {}
