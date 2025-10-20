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

export type ValidModalComponent = TextDisplayBuilder | LabelBuilder;
export type ValidLabelComponent =
    | ChannelSelectMenuBuilder
    | MentionableSelectMenuBuilder
    | RoleSelectMenuBuilder
    | StringSelectMenuBuilder
    | TextInputBuilder
    | UserSelectMenuBuilder;

/**
 * Making modals easier to create since 2025!
 *
 * @example
 * ```typescript
 * const modal = ui.modals
 *  .create("test", "Test Modal")
 *  .withTextDisplay("Love you. :)")
 *  .withTextInput("feelings", "How do you feel about me?")
 *  .build();
 * ```
 */
export class EasyModalBuilder {
    private client: UiClient;
    private components: ValidModalComponent[];
    private modal: ModalBuilder;

    /**
     * Called internally. **DO NOT INSTANTIATE MANUALLY!**
     *
     * Use `ModalBuilders.create()` instead!
     */
    constructor(client: UiClient, customId: string, title: string) {
        this.client = client;
        this.components = [];
        this.modal = new ModalBuilder().setCustomId(customId).setTitle(title);
    }

    /**
     * @internal
     * 
     * Constructs a LabelBuilder with a component inside it.
     * @param label The text of the label.
     * @param component 
     * @param options 
     * @returns 
     */
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

    /**
     * Creates a brand new Text Display component, AKA just a piece of plain text shown to the user. Nothing special.
     * @param content The content of the text display
     * @returns This instance for chaining.
     */
    public withTextDisplay(content: string): this {
        this.components.push(new TextDisplayBuilder().setContent(content));
        return this;
    }

    /**
     * Creates a brand new Text Input component, something the user can enter any text into!
     * @param customId The custom ID of the text input, this is used when the user submits the modal.
     * @param options The options for this text input, `label` and `style` are required here.
     * @returns This instance for chaining.
     */
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

    /**
     * Creates a brand new Channel Select Menu component, where the user can unsurprisingly, select a channel.
     * @param customId The custom ID of the text input, this is used when the user submits the modal.
     * @param options The options for this component, `label` is required here.
     * @returns This instance for chaining.
     */
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

    /**
     * Builds the final ModalBuilder.
     * @returns A ModalBuilder that holds all the components you constructed here.
     * @see https://discord.js.org/docs/packages/discord.js/14.23.2/ModalBuilder:Class
     */
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

    /**
     * Allows you to easily create a modal!
     * @param customId The custom ID of the modal, this is used when the user submits it.
     * @param title The title of the modal
     * @returns
     * @example
     * ```typescript
     * const modal = ui.modals
     *  .create("test", "Test Modal")
     *  .withTextDisplay("Love you. :)")
     *  .withTextInput("feelings", "How do you feel about me?")
     *  .build();
     * ```
     */
    public create(customId: string, title: string): EasyModalBuilder {
        return new EasyModalBuilder(this.client, customId, title);
    }
}
