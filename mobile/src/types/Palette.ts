interface ColorTones {
    light: string;
    main: string;
    dark: string;
}

interface Palette {
    primary: ColorTones;
    secondary: ColorTones;
    highlight: ColorTones;
    error: ColorTones;
    warning: ColorTones;
    info: ColorTones;
    success: ColorTones;
}

export type { Palette, ColorTones };
