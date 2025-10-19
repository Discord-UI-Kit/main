export * from "@discord-ui-kit/core";
export * from "./allowed";

import { UiCore, type UiCoreOptions } from "@discord-ui-kit/core";

import { Includes, type Allowed } from "./allowed";

// Builders
import { ButtonBuilders } from "./builders/buttons";
import { ActionRowBuilders } from "./builders/actionRows";
import { EmbedBuilders } from "./builders/embeds";
import { SelectMenuBuilders } from "./builders/selectMenus";
import { ModalBuilders } from "./builders/modals";
import { UiClientHelpers } from "./helpers";

interface UiClientOptions extends UiCoreOptions {
    include?: Allowed[];
}

export class UiClient {
    public readonly options: UiClientOptions;
    public readonly core: UiCore;

    private _actionRowBuilders: ActionRowBuilders;
    private _buttonBuilders: ButtonBuilders;
    private _embedBuilders: EmbedBuilders;
    private _helpers: UiClientHelpers;
    private _modalBuilders: ModalBuilders;
    private _selectMenuBuilders: SelectMenuBuilders;

    /**
     * The action row builders
     */
    public get actionRows(): ActionRowBuilders {
        return this._actionRowBuilders;
    }

    /**
     * The button builders. This will throw if Buttons is not part of the includes.
     */
    public get buttons(): ButtonBuilders {
        this.helpers.ensureButtonsIncluded();
        return this._buttonBuilders;
    }

    /**
     * The embed builders. This will throw if Embeds is not part of the includes.
     */
    public get embeds(): EmbedBuilders {
        this.helpers.ensureEmbedsIncluded();
        return this._embedBuilders;
    }

    /**
     * Some helper methods to make sure things are included. You probably don't need to access this. :)
     */
    public get helpers(): UiClientHelpers {
        return this._helpers;
    }

    /**
     * The modal builders. This will throw if Embeds is not part of the includes.
     */
    public get modals(): ModalBuilders {
        this.helpers.ensureModalsIncluded();
        return this._modalBuilders;
    }

    /**
     * The select menu builders. This will throw if SelectMenus is not part of the includes.
     */
    public get selectMenus(): SelectMenuBuilders {
        this.helpers.ensureSelectMenusIncluded();
        return this._selectMenuBuilders;
    }

    constructor(options?: UiClientOptions) {
        const defaultIncludes: Allowed[] = [
            Includes.Buttons,
            Includes.SelectMenus,
            Includes.Modals,
            Includes.Embeds,
        ];

        this.options = options ?? {
            include: defaultIncludes,
        };

        if (!this.options.include) this.options.include = defaultIncludes;

        this.core = new UiCore(this.options);

        this._actionRowBuilders = new ActionRowBuilders(this);
        this._buttonBuilders = new ButtonBuilders(this);
        this._embedBuilders = new EmbedBuilders(this);
        this._helpers = new UiClientHelpers(this);
        this._modalBuilders = new ModalBuilders(this);
        this._selectMenuBuilders = new SelectMenuBuilders();
    }
}
