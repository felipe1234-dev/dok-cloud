import React from "react";
import { Composer } from "./src/components";
import {
    ThemeProvider,
    LoaderProvider,
    RouterProvider,
    AuthProvider,
    TreeProvider,
} from "./src/providers";
import Root from "./src/Root";

function App() {
    const providers = [
        ThemeProvider,
        LoaderProvider,
        RouterProvider,
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
