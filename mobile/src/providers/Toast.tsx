import { createContext, useContext, ReactNode } from "react";
import { useI18n } from "./I18n";
import Toast, { ToastShowParams } from "react-native-toast-message";

interface ToastParams extends Omit<ToastShowParams, "text1" | "text2"> {
    title?: string;
    description?: string;
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
        const { title, description, ...rest } = params;
        Toast.show({
            text1: t(title || ""),
            text2: t(description || ""),
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
