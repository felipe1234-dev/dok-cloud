import React from "react";
import { Composer } from "./src/components";
import {
    LoaderProvider,
    AuthProvider,
    I18nProvider,
    ToastProvider,
    ThemeProvider,
    NavigatorProvider,
    CloudProvider,
} from "./src/providers";
import Root from "./src/Root";

function App() {
    const providers = [
        LoaderProvider,
        AuthProvider,
        I18nProvider,
        ToastProvider,
        ThemeProvider,
        NavigatorProvider,
        CloudProvider,
    ];

    return (
        <Composer components={providers}>
            <Root />
        </Composer>
    );
}

export default App;
