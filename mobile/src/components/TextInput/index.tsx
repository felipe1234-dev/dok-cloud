import { ReactNode } from "react";
import { View, Text, TextStyle, ViewStyle } from "react-native";
import { TextInput as NativeTextInput } from "react-native";
import { TextInputProps as NativeTextInputProps } from "react-native";
import { InputMaskerSettings } from "@utils";

import useLogic from "./useLogic";
import useStyles from "./useStyles";

interface TextInputProps
    extends Omit<NativeTextInputProps, "onChangeText">,
        Partial<InputMaskerSettings> {
    fullWidth?: boolean;
    label?: ReactNode;
    labelStyle?: TextStyle;
    inputStyle?: ViewStyle;
    onChangeText?: (text: string, maskedText?: string) => void | Promise<void>;
    left?: ReactNode;
    right?: ReactNode;
}

function TextInput(props: TextInputProps) {
    const { label, left, right, ...rest } = props;
    const {
        focused,
        touching,
        handleOnChangeText,
        handleOnFocus,
        handleOnBlur,
        handleOnTouchStart,
        handleOnTouchEnd,
    } = useLogic(props);
    const styles = useStyles({
        ...props,
        focused,
        touching,
    });

    return (
        <View style={styles.control}>
            {label && <Text style={styles.label}>{label}</Text>}
            <View
                onTouchStart={handleOnTouchStart}
                onTouchEnd={handleOnTouchEnd}
                style={styles.container}
            >
                {left && left}
                <NativeTextInput
                    onChangeText={handleOnChangeText}
                    onFocus={handleOnFocus}
                    onBlur={handleOnBlur}
                    placeholderTextColor={styles.input.placeholderTextColor}
                    style={styles.input}
                    {...rest}
                />
                {right && right}
            </View>
        </View>
    );
}

export { TextInput };
export type { TextInputProps };
