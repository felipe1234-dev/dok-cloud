import { useTheme, useAuth, useI18n, languages, Language } from "@providers";

function useLogic() {
    const { toggleTheme, theme } = useTheme();
    const { t, language, setLanguage } = useI18n();
    const { user } = useAuth();

    const isLight = theme === "light";
    const handleToggleTheme = toggleTheme;

    const languageOptions = (Object.keys(languages) as Language[]).map(
        (lang) => ({
            key: lang,
            label: t(lang.replace("_", " ")),
            value: lang,
        })
    );
    const handleLanguageChange = (value: Language) => {
        setLanguage(value);
    };

    return {
        user,
        handleToggleTheme,
        isLight,
        handleLanguageChange,
        languageOptions,
        selectedLanguage: language,
    };
}

export default useLogic;
