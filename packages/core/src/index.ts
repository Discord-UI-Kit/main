import { UiColorsBase } from "./ColorsBase";
import { UiEmojiBase } from "./EmojiBase";

export * from "./ColorsBase";
export * from "./EmojiBase";

/**
 * The options that are used for the UI
 */
export interface UiCoreOptions<C extends UiColorsBase, E extends UiEmojiBase> {
    colors?: C;
    emojis?: E;
}

/**
 * A collection of core utilities for all adapters for this UI kit.
 */
export class UiCore<
    C extends UiColorsBase = UiColorsBase,
    E extends UiEmojiBase = UiEmojiBase,
> {
    private _colors: C;
    private _emojis: E;

    constructor(options?: UiCoreOptions<C, E>) {
        this._colors = (options?.colors ?? new UiColorsBase()) as C;
        this._emojis = (options?.emojis ?? new UiEmojiBase()) as E;
    }

    public get colors(): C {
        return this._colors;
    }

    public get emojis(): E {
        return this._emojis;
    }
}
