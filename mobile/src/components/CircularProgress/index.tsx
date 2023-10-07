import { ReactNode } from "react";
import { View } from "react-native";
import {
    AnimatedCircularProgress,
    AnimatedCircularProgressProps,
} from "react-native-circular-progress";
import useStyles from "./useStyles";

type OmittedProps = "width" | "fill";

interface CircularProgressProps
    extends Omit<AnimatedCircularProgressProps, OmittedProps> {
    thickness: number;
    progress: number;
    label?: ReactNode;
}

function CircularProgress(props: CircularProgressProps) {
    let { label, thickness, progress = 0, ...rest } = props;
    progress = Math.max(1, progress);
    progress = Math.min(progress, 100);
    const styles = useStyles({ ...props, thickness, progress });

    return (
        <View style={styles.container}>
            <AnimatedCircularProgress
                width={thickness}
                fill={progress}
                {...rest}
            />
            {label && <View style={styles.label}>{label}</View>}
        </View>
    );
}

export { CircularProgress };
export type { CircularProgressProps };
