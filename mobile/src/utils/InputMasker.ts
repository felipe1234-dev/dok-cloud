interface InputMaskerSettings {
    mask: string;
    alwaysShowMask?: boolean;
    showMask?: boolean;
    maskChar?: string;
    formatChars?: {
        [char: string]: string;
    };
}

class InputMasker {
    public settings: InputMaskerSettings;

    constructor(settings: InputMaskerSettings) {
        this.settings = settings;
    }

    public mask(value: string): string {
        const {
            mask,
            maskChar = " ",
            alwaysShowMask = false,
            showMask = false,
            formatChars = {
                "9": "[0-9]",
                a: "[a-zA-Z]",
                "*": "[A-Za-z0-9]",
            },
        } = this.settings;

        value = value.replace(/\s/g, "");

        let maskedValue = "";
        let cursorPos = 0;
        let i = 0;
        let j = 0;

        while (i < mask.length) {
            const charInMask = mask[i];
            const charInValue = value[j] || "";
            const patternStr = formatChars[charInMask] || false;
            const showMaskUntilIndex =
                alwaysShowMask || showMask ? mask.length : cursorPos;
            const mustShowMaskNow = i <= showMaskUntilIndex;

            if (patternStr) {
                const pattern = new RegExp(patternStr);
                const matches = !!charInValue.match(pattern);

                if (!matches) {
                    maskedValue += mustShowMaskNow ? maskChar : "";
                } else {
                    maskedValue += charInValue;
                    if (mustShowMaskNow) cursorPos++;
                    j++;
                }
            } else {
                maskedValue += mustShowMaskNow ? charInMask : "";
                if (mustShowMaskNow) cursorPos++;
            }

            i++;
        }

        return maskedValue;
    }
}

export { InputMasker };
export type { InputMaskerSettings };
