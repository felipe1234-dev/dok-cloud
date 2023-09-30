import {
    AnimatedCircularProgress,
    AnimatedCircularProgressProps,
} from "react-native-circular-progress";

type OmittedProps = "width" | "fill";

interface CircularProgressProps
    extends Omit<AnimatedCircularProgressProps, OmittedProps> {
    thickness: number;
    progress: number;
}

function CircularProgress(props: CircularProgressProps) {
    let { thickness, progress = 0, ...rest } = props;
    progress = Math.max(0, progress);
    progress = Math.min(progress, 100);

    return (
        <AnimatedCircularProgress
            width={thickness}
            fill={progress}
            {...rest}
        />
    );
}

export { CircularProgress };
export type { CircularProgressProps };
