import { pt_BR } from "./pt_BR";
import { en_US } from "./en_US";

const languages = {
    en_US,
    pt_BR,
};

type Language = keyof typeof languages;

const languageList = Object.keys(languages) as Language[];

function isLanguage(value: any): value is Language {
    return languageList.includes(value);
}

export { languages, languageList, isLanguage };
export type { Language };
export default languages;
