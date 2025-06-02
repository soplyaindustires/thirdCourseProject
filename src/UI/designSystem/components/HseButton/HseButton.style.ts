import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { borderRadiusPalette, colorPalette, paddingPalette } from '../../constants.style';

type HseButtonStyleEntries = {
    body: ViewStyle;
    text: TextStyle;
};

const HseButtonStyleBase: HseButtonStyleEntries = StyleSheet.create({
    body: {
        padding: paddingPalette.big,
        borderRadius: borderRadiusPalette.medium,
        backgroundColor: colorPalette.backgroundAccent,
    },
    text: {
        fontSize: 16,
    },
});

const HseButtonStyleGray: HseButtonStyleEntries = StyleSheet.create({
    body: {
        backgroundColor: colorPalette.backgroundAccent,
    },
    text: {
        color: colorPalette.textPrimary,
    },
});

const HseButtonStyleBlue: HseButtonStyleEntries = StyleSheet.create({
    body: {
        backgroundColor: colorPalette.primary,
    },
    text: {
        color: colorPalette.backgroundPrimary,
    },
});

export const HseButtonStyle = {
    gray: {
        body: StyleSheet.compose(HseButtonStyleBase.body, HseButtonStyleGray.body),
        text: StyleSheet.compose(HseButtonStyleBase.text, HseButtonStyleGray.text),
    },
    blue: {
        body: StyleSheet.compose(HseButtonStyleBase.body, HseButtonStyleBlue.body),
        text: StyleSheet.compose(HseButtonStyleBase.text, HseButtonStyleBlue.text),
    },
};
