import Toast, {
    BaseToastProps,
    SuccessToast,
    ErrorToast,
    InfoToast,
} from "react-native-toast-message";
import { useTheme } from "@providers";

function CustomToast() {
    const { palette } = useTheme();

    const renderToast =
        (
            type: "success" | "error" | "info",
            Component: (props: BaseToastProps) => JSX.Element
        ) =>
        (props: any) =>
            (
                <Component
                    {...props}
                    style={{
                        ...props?.style,
                        maxWidth: "90%",
                        borderLeftColor: palette[type].light,
                    }}
                />
            );

    const toastConfig = {
        success: renderToast("success", SuccessToast),
        error: renderToast("error", ErrorToast),
        info: renderToast("info", InfoToast),
    };

    return <Toast config={toastConfig} />;
}

export { CustomToast };
