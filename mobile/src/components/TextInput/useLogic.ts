import { useState, useEffect, useMemo } from "react";
import { TextInputProps as NativeTextInputProps } from "react-native";
import { InputMasker } from "@utils";
import { TextInputProps } from "./index";

interface TextInputLogicParams extends TextInputProps {}

function useLogic(params: TextInputLogicParams) {
    const {
        onFocus,
        onBlur,
        onTouchStart,
        onTouchEnd,
        onChangeText,
        mask,
        alwaysShowMask,
        showMask,
        maskChar,
    } = params;

    const [focused, setFocused] = useState(false);
    const [touching, setTouching] = useState(false);

    const masker = useMemo(() => {
        if (!mask) return undefined;
        return new InputMasker({
            mask,
            alwaysShowMask,
            showMask,
            maskChar,
        });
    }, [mask, alwaysShowMask, showMask, maskChar]);

    const handleOnFocus: TextInputProps["onFocus"] = (evt) => {
        setFocused(true);
        if (onFocus) onFocus(evt);
    };

    const handleOnBlur: TextInputProps["onBlur"] = (evt) => {
        setFocused(false);
        if (onBlur) onBlur(evt);
    };

    const handleOnTouchStart: TextInputProps["onTouchStart"] = (evt) => {
        setTouching(true);
        if (onTouchStart) onTouchStart(evt);
    };

    const handleOnTouchEnd: TextInputProps["onTouchEnd"] = (evt) => {
        setTouching(false);
        if (onTouchEnd) onTouchEnd(evt);
    };

    const handleOnChangeText: NativeTextInputProps["onChangeText"] = (text) => {
        const maskedText = masker ? masker.mask(text) : undefined;
        if (onChangeText) onChangeText(text, maskedText);
    };

    return {
        focused,
        touching,
        handleOnChangeText,
        handleOnBlur,
        handleOnFocus,
        handleOnTouchStart,
        handleOnTouchEnd,
    };
}

export default useLogic;
