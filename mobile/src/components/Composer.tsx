import { ReactNode } from "react";

interface ComposerProps {
    components: Array<Function>;
    children?: ReactNode;
}

function Composer(props: ComposerProps) {
    return (
        <>
            {props.components.reduceRight(
                (otherComponents, Component) => (
                    <Component>{otherComponents}</Component>
                ),
                props.children
            )}
        </>
    );
}

export { Composer };
export type { ComposerProps };
