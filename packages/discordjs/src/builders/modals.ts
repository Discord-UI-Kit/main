import {
    ChannelSelectMenuBuilder,
    LabelBuilder,
    MentionableSelectMenuBuilder,
    ModalBuilder,
    RoleSelectMenuBuilder,
    StringSelectMenuBuilder,
    TextDisplayBuilder,
    TextInputBuilder,
    UserSelectMenuBuilder,
} from "discord.js";
import type {
    InputOptions,
    ModalChannelSelectMenuOptions,
    ModalMentionableSelectMenuOptions,
    ModalRoleSelectMenuOptions,
    ModalStringSelectMenuOptions,
    ModalUserSelectMenuOptions,
    TextInputOptions,
} from "../options";
import type { UiClient } from "..";

type ValidModalComponent = TextDisplayBuilder | LabelBuilder;
type ValidLabelComponent =
    | ChannelSelectMenuBuilder
    | MentionableSelectMenuBuilder
    | RoleSelectMenuBuilder
    | StringSelectMenuBuilder
    | TextInputBuilder
    | UserSelectMenuBuilder;

class EasyModalBuilder {
    private client: UiClient;
    private components: ValidModalComponent[];
    private modal: ModalBuilder;

    constructor(client: UiClient, customId: string, title: string) {
        this.client = client;
        this.components = [];
        this.modal = new ModalBuilder().setCustomId(customId).setTitle(title);
    }

    private constructLabelWithComponent<T extends ValidLabelComponent>(
        label: string,
        component: T,
        options: Partial<Pick<InputOptions, "description">>,
    ): LabelBuilder {
        const builder = new LabelBuilder().setLabel(label);

        if (options.description) builder.setDescription(options.description);

        // Kinda wish discord.js had a simple setComponent method!
        if (component instanceof ChannelSelectMenuBuilder)
            builder.setChannelSelectMenuComponent(component);
        else if (component instanceof MentionableSelectMenuBuilder)
            builder.setMentionableSelectMenuComponent(component);
        else if (component instanceof RoleSelectMenuBuilder)
            builder.setRoleSelectMenuComponent(component);
        else if (component instanceof StringSelectMenuBuilder)
            builder.setStringSelectMenuComponent(component);
        else if (component instanceof TextInputBuilder)
            builder.setTextInputComponent(component);
        else if (component instanceof UserSelectMenuBuilder)
            builder.setUserSelectMenuComponent(component);

        return builder;
    }

    public withTextDisplay(content: string): this {
        this.components.push(new TextDisplayBuilder().setContent(content));
        return this;
    }

    public withTextInput(customId: string, options: TextInputOptions): this {
        const textInput = new TextInputBuilder()
            .setCustomId(customId)
            .setRequired(options.required ?? false);

        if (options.min) textInput.setMinLength(options.min);
        if (options.max) textInput.setMaxLength(options.max);
        if (options.placeholder) textInput.setPlaceholder(options.placeholder);

        const label = this.constructLabelWithComponent(
            options.label,
            textInput,
            options,
        );

        this.components.push(label);

        return this;
    }

    public withChannelSelect(
        customId: string,
        options: ModalChannelSelectMenuOptions,
    ): this {
        this.client.helpers.ensureSelectMenusIncluded();

        const selectMenu = this.client.selectMenus.channel(customId, options);
        const label = this.constructLabelWithComponent(
            options.label,
            selectMenu,
            options,
        );

        this.components.push(label);

        return this;
    }

    public withMentionableSelect(
        customId: string,
        options: ModalMentionableSelectMenuOptions,
    ): this {
        this.client.helpers.ensureSelectMenusIncluded();

        const selectMenu = this.client.selectMenus.mentionable(
            customId,
            options,
        );
        const label = this.constructLabelWithComponent(
            options.label,
            selectMenu,
            options,
        );

        this.components.push(label);

        return this;
    }

    public withRoleSelect(
        customId: string,
        options: ModalRoleSelectMenuOptions,
    ): this {
        this.client.helpers.ensureSelectMenusIncluded();

        const selectMenu = this.client.selectMenus.role(customId, options);
        const label = this.constructLabelWithComponent(
            options.label,
            selectMenu,
            options,
        );

        this.components.push(label);

        return this;
    }

    public withStringSelect(
        customId: string,
        options: ModalStringSelectMenuOptions,
    ): this {
        this.client.helpers.ensureSelectMenusIncluded();

        const selectMenu = this.client.selectMenus.string(customId, options);
        const label = this.constructLabelWithComponent(
            options.label,
            selectMenu,
            options,
        );

        this.components.push(label);

        return this;
    }

    public withUserSelect(
        customId: string,
        options: ModalUserSelectMenuOptions,
    ): this {
        this.client.helpers.ensureSelectMenusIncluded();

        const selectMenu = this.client.selectMenus.user(customId, options);
        const label = this.constructLabelWithComponent(
            options.label,
            selectMenu,
            options,
        );

        this.components.push(label);

        return this;
    }

    public build(): ModalBuilder {
        for (const component of this.components) {
            if (component instanceof LabelBuilder)
                this.modal.addLabelComponents(component);
            else this.modal.addTextDisplayComponents(component);
        }

        return this.modal;
    }
}

export class ModalBuilders {
    private client: UiClient;

    constructor(client: UiClient) {
        this.client = client;
    }

    public create(customId: string, title: string): EasyModalBuilder {
        return new EasyModalBuilder(this.client, customId, title);
    }
}
