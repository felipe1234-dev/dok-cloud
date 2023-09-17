import { ReactNode } from "react";
import { useAuth } from "@providers";
import { WelcomeScreen } from "@screens";

interface ProtectedProps {
    children: ReactNode;
}

function Protected(props: ProtectedProps) {
    const { user } = useAuth();
    const allowed = !!user;

    if (!allowed) return <WelcomeScreen />;

    return <>{props.children}</>;
}

export { Protected };
