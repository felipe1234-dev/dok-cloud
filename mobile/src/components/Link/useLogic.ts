import { useState } from "react";
import { Linking } from "react-native";

import { useNavigator, useToast } from "@providers";
import { LinkProps } from "./index";

interface LinkLogicParams extends LinkProps {}

function useLogic(params: LinkLogicParams) {
    const {
        url,
        to,
        reload,
        screenProps = {},
        onTouchStart,
        onTouchEnd,
        onPress,
    } = params;
    const [touching, setTouching] = useState(false);

    const { navigate } = useNavigator();
    const toast = useToast();

    const handleOnTouchStart: LinkProps["onTouchStart"] = (evt) => {
        setTouching(true);
        if (onTouchStart) onTouchStart(evt);
    };

    const handleOnTouchEnd: LinkProps["onTouchEnd"] = (evt) => {
        setTouching(true);
        if (onTouchEnd) onTouchEnd(evt);
    };

    const handleOnPress: LinkProps["onPress"] = async (evt) => {
        if (to) {
            navigate(to, screenProps, reload);
        } else if (url) {
            const supported = await Linking.canOpenURL(url);

            if (supported) {
                await Linking.openURL(url);
            } else {
                toast.error({
                    title: "Broken url",
                    description: [
                        "Unable to open this URL: $url",
                        { $url: url },
                    ],
                });
            }
        }

        if (onPress) onPress(evt);
    };

    return {
        touching,
        handleOnTouchStart,
        handleOnTouchEnd,
        handleOnPress,
    };
}

export default useLogic;
