import { createContext, useContext, useState, ReactNode } from "react";
import languages, { Language } from "./languages";

interface ReplaceMatrix {
    [key: string]: string;
}

interface I18nValue {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (text: string, replaceMatrix?: ReplaceMatrix) => string;
}

const I18nContext = createContext<I18nValue | undefined>(undefined);

function I18nProvider(props: { children: ReactNode }) {
    const [language, setLanguage] = useState<Language>("en_US");

    const t = (text: string, replaceMatrix: ReplaceMatrix) => {
        let result = languages[language][text] || text;

        if (replaceMatrix) {
            for (const [key, value] of Object.entries(replaceMatrix)) {
                result = result.replace(key, value);
            }
        }

        return result;
    };

    return (
        <I18nContext.Provider value={{ language, setLanguage, t }}>
            {props.children}
        </I18nContext.Provider>
    );
}

function useI18n() {
    const context = useContext(I18nContext);
    if (!context) throw new Error("useI18n must be used within a I18nProvider");
    return context;
}

export { I18nContext, I18nProvider, useI18n };
export type { I18nValue, ReplaceMatrix };
