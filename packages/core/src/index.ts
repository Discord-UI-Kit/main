import { UiColorsBase } from "./ColorsBase";
import { UiEmojiBase } from "./EmojiBase";

export * from "./ColorsBase";
export * from "./EmojiBase";

/**
 * The options that are used for the UI
 */
export interface UiCoreOptions {
    colors?: UiColorsBase;
    emojis?: UiEmojiBase;
}

/**
 * A collection of core utilities for all adapters for this UI kit.
 */
export class UiCore {
    private _colors: UiColorsBase;
    private _emojis: UiEmojiBase;

    constructor(options?: UiCoreOptions) {
        this._colors = options?.colors ?? new UiColorsBase();
        this._emojis = options?.emojis ?? new UiEmojiBase();
    }

    public get colors(): UiColorsBase {
        return this._colors;
    }

    public get emojis(): UiEmojiBase {
        return this._emojis;
    }
}
