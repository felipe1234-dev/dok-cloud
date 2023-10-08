import {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react";
import languages, { Language, isLanguage } from "./languages";
import { useAsyncEffect } from "@hooks";
import { useAuth } from "../Auth";
import { Api } from "@services";

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
    const { user } = useAuth();

    /**
     * @param text The text to be translated
     * @param replaceMatrix The replace matrix to be used for inserting variable values into the translated text dynamically
     */
    const t = (text: string, replaceMatrix?: ReplaceMatrix) => {
        let result = languages[language][text] || text;

        if (replaceMatrix) {
            for (const [key, value] of Object.entries(replaceMatrix)) {
                result = result.replace(key, value);
            }
        }

        return result;
    };

    useEffect(() => {
        if (!user?.uid) return;
        if (isLanguage(user.language)) setLanguage(user.language);
    }, [user?.uid]);

    useAsyncEffect(async () => {
        if (!user?.uid) return;
        if (user.language !== language)
            await Api.users.update(user.uid, { language });
    }, [language, user?.language, user?.uid]);

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
export * from "./languages";
