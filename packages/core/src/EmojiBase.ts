/**
 * The base class for all emojis used by adapters
 */
export class UiEmojiBase {
    /**
     * A nice wholesome check mark!
     */
    public get checkMark(): string {
        return "✅";
    }

    /**
     * Oops, you did something wrong. This emoji signifies it!
     */
    public get crossMark(): string {
        return "❌";
    }

    /**
     * Back we go!
     */
    public get leftArrow(): string {
        return "⬅️";
    }

    /**
     * And... we're here!
     */
    public get stopIcon(): string {
        return "⏹️";
    }

    /**
     * Forward we go!
     */
    public get rightArrow(): string {
        return "➡️";
    }
}
