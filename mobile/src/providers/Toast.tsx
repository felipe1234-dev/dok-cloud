import { createContext, useContext, ReactNode } from "react";
import { useI18n, ReplaceMatrix } from "./I18n";
import Toast, { ToastShowParams } from "react-native-toast-message";

interface ToastParams extends Omit<ToastShowParams, "text1" | "text2"> {
    title?: string | [string, ReplaceMatrix];
    description?: string | [string, ReplaceMatrix];
}

interface ToastValue {
    show: (params: ToastParams) => void;
    success: (params: ToastParams) => void;
    error: (params: ToastParams) => void;
    info: (params: ToastParams) => void;
    hide: () => void;
}

const ToastContext = createContext<ToastValue | undefined>(undefined);

function ToastProvider(props: { children: ReactNode }) {
    const { t } = useI18n();

    const show = (params: ToastParams) => {
        let { title = "", description = "", ...rest } = params;

        if (Array.isArray(title)) {
            title = t(...title);
        } else {
            title = t(title);
        }

        if (Array.isArray(description)) {
            description = t(...description);
        } else {
            description = t(description);
        }

        Toast.show({
            text1: title,
            text2: description,
            ...rest,
        });
    };

    const success = (params: ToastParams) => {
        show({
            ...params,
            type: "success",
        });
    };

    const error = (params: ToastParams) => {
        show({
            ...params,
            type: "error",
        });
    };

    const info = (params: ToastParams) => {
        show({
            ...params,
            type: "info",
        });
    };

    const hide = () => {
        Toast.hide();
    };

    return (
        <ToastContext.Provider value={{ show, success, error, info, hide }}>
            {props.children}
        </ToastContext.Provider>
    );
}

function useToast() {
    const context = useContext(ToastContext);
    if (!context)
        throw new Error("useToast must be used within a ToastProvider");
    return context;
}

export { ToastContext, ToastProvider, useToast };
export type { ToastValue, ToastParams };
