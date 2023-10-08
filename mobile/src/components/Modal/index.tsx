import { ReactNode } from "react";
import { Dimensions, Platform } from "react-native";
import NativeModal, {
    ModalProps as NativeModalProps,
} from "react-native-modal";

const realDeviceWidth = Dimensions.get("window").width;
const realDeviceHeight: number =
    Platform.OS === "ios"
        ? Dimensions.get("window").height
        : require("react-native-extra-dimensions-android").get(
              "REAL_WINDOW_HEIGHT"
          );

interface ModalProps extends Partial<NativeModalProps> {
    children: ReactNode;
}

function Modal(props: ModalProps) {
    const {
        isVisible = false,
        deviceWidth = realDeviceWidth,
        deviceHeight = realDeviceHeight,
        animationIn = "slideInUp",
        animationInTiming = 300,
        animationOut = "slideOutDown",
        animationOutTiming = 300,
        avoidKeyboard = false,
        coverScreen = true,
        hasBackdrop = true,
        backdropColor = "black",
        backdropOpacity = 0.7,
        backdropTransitionInTiming = 300,
        backdropTransitionOutTiming = 300,
        panResponderThreshold = 4,
        scrollOffset = 0,
        scrollOffsetMax = 0,
        scrollHorizontal = false,
        swipeThreshold = 100,
        swipeDirection = "up",
        useNativeDriver = false,
        hideModalContentWhileAnimating = false,
        ...rest
    } = props;

    const otherProps = {
        animationIn,
        animationInTiming,
        animationOut,
        animationOutTiming,
        avoidKeyboard,
        coverScreen,
        hasBackdrop,
        backdropColor,
        backdropOpacity,
        backdropTransitionInTiming,
        backdropTransitionOutTiming,
        deviceHeight,
        deviceWidth,
        isVisible,
        panResponderThreshold,
        scrollOffset,
        scrollOffsetMax,
        scrollHorizontal,
        swipeThreshold,
        swipeDirection,
        useNativeDriver,
        hideModalContentWhileAnimating,
    };

    return (
        <NativeModal
            {...otherProps}
            {...rest}
        />
    );
}

export { Modal };
export type { ModalProps };
