import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { borderRadiusPalette, colorPalette, paddingPalette } from '../../constants.style';

enum ButtonVariant {
    Gray = 'gray',
    Blue = 'blue',
    Transparent = 'transparent',
}

type Parts = 'body';
type Entries = ViewStyle | TextStyle;

const baseStyles = StyleSheet.create({
    body: {
        overflow: 'hidden',
        height: 50,
    },
});

const buttonVariants: Record<ButtonVariant, { [k in Parts]: Entries }> = {
    [ButtonVariant.Gray]: StyleSheet.create({
        body: {
            backgroundColor: colorPalette.backgroundAccent,
        },
    }),
    [ButtonVariant.Blue]: StyleSheet.create({
        body: {
            backgroundColor: colorPalette.primary,
        },
    }),
    [ButtonVariant.Transparent]: StyleSheet.create({
        body: {
            backgroundColor: 'transparent',
            borderColor: colorPalette.backgroundAccent,
            borderWidth: 1,
        },
    }),
};

const getButtonStyles = (variant: ButtonVariant) => ({
    body: [baseStyles.body, buttonVariants[variant].body],
});

export const HseButtonStyle = {
    gray: getButtonStyles(ButtonVariant.Gray),
    blue: getButtonStyles(ButtonVariant.Blue),
    transparent: getButtonStyles(ButtonVariant.Transparent),
};
