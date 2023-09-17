interface ColorTones {
    light: string;
    main: string;
    dark: string;
}

interface Palette {
    primary: ColorTones;
    secondary: ColorTones;
    highlight: ColorTones;
    text: ColorTones;
    error: ColorTones;
    warning: ColorTones;
    info: ColorTones;
    success: ColorTones;
}

type Variant = keyof Palette;
type ColorTone = keyof ColorTones;

export type { Palette, ColorTones, Variant, ColorTone };
