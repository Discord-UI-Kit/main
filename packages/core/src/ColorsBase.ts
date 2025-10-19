export type Color =
    | `#${string}`
    | number
    | readonly [red: number, green: number, blue: number];

/**
 * The base class for all colors used by adapters
 */
export class UiColorsBase {
    public get info(): Color {
        return 0x00ffff;
    }

    public get warning(): Color {
        return 0xffff00;
    }

    public get success(): Color {
        return 0x00ff00;
    }

    public get danger(): Color {
        return 0xffa500;
    }

    public get error(): Color {
        return 0xff0000;
    }

    public get neutral(): Color {
        return 0x333333;
    }

    /**
     * A random color to spice up everything!
     *
     * It is not recommended to override this method unless you want to do your own randomization.
     */
    public get random(): Color {
        return Math.floor(Math.random() * 0xffffff);
    }
}
