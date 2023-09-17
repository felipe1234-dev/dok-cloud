import React from "react";
import { Composer } from "./src/components";
import {
    I18nProvider,
    ThemeProvider,
    LoaderProvider,
    ToastProvider,
    NavigatorProvider,
    AuthProvider,
    TreeProvider,
} from "./src/providers";
import Root from "./src/Root";

function App() {
    const providers = [
        I18nProvider,
        ThemeProvider,
        LoaderProvider,
        ToastProvider,
        NavigatorProvider,
        AuthProvider,
        TreeProvider,
    ];

    return (
        <Composer components={providers}>
            <Root />
        </Composer>
    );
}

export default App;
