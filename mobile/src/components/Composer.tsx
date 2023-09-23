import { ReactNode } from "react";

interface ComposerProps {
    components: Array<(props: any) => JSX.Element>;
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
