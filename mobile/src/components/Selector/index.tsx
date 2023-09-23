import { ReactNode } from "react";
import { View, ViewStyle, TextStyle } from "react-native";
import { Picker } from "@react-native-picker/picker";
import useStyles from "./useStyles";

interface Option<T> {
    key: string;
    label: string;
    value: T;
}

interface SelectorProps<T> {
    fullWidth?: boolean;
    left?: ReactNode;
    right?: ReactNode;
    options: Option<T>[];
    onChange: (value: T) => void | Promise<void>;
    value: T;
    containerStyle?: ViewStyle;
    pickerStyle?: TextStyle;
}

function Selector<T>(props: SelectorProps<T>) {
    const { left, right, options, onChange, value } = props;
    const styles = useStyles(props);

    return (
        <View style={styles.container}>
            {left && left}
            <Picker
                onValueChange={onChange}
                selectedValue={value}
                style={styles.picker}
            >
                {options.map((option) => (
                    <Picker.Item
                        key={option.key}
                        label={option.label}
                        value={option.value}
                    />
                ))}
            </Picker>
            {right && right}
        </View>
    );
}

export { Selector };
export type { SelectorProps, Option };
