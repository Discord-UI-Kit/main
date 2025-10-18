import { UiEmojiBase } from "./EmojiBase";

export * from "./EmojiBase";

interface UiCoreOptions {
    emojis?: UiEmojiBase;
}

export class UiCore {
    private _emojis: UiEmojiBase;

    constructor(options?: UiCoreOptions) {
        this._emojis = options?.emojis ?? new UiEmojiBase();
    }

    public get emojis(): UiEmojiBase {
        return this._emojis;
    }
}
