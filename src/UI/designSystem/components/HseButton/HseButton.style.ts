import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { borderRadiusPalette, colorPalette, paddingPalette } from '../../constants.style';

enum ButtonVariant {
    Gray = 'gray',
    Blue = 'blue',
}

type Parts = 'body' | 'text';
type Entries = ViewStyle | TextStyle;

const baseStyles = StyleSheet.create({
    body: {
        overflow: 'hidden',
        height: 50,
    },
    text: {
        textAlign: 'center',
    },
});

const buttonVariants: Record<ButtonVariant, { [k in Parts]: Entries }> = {
    [ButtonVariant.Gray]: StyleSheet.create({
        body: {
            backgroundColor: colorPalette.backgroundAccent,
        },
        text: {
            color: colorPalette.textPrimary,
        },
    }),
    [ButtonVariant.Blue]: StyleSheet.create({
        body: {
            backgroundColor: colorPalette.primary,
        },
        text: {
            color: colorPalette.backgroundPrimary,
        },
    }),
};

const getButtonStyles = (variant: ButtonVariant) => ({
    body: [baseStyles.body, buttonVariants[variant].body],
    text: [baseStyles.text, buttonVariants[variant].text],
});

export const HseButtonStyle = {
    gray: getButtonStyles(ButtonVariant.Gray),
    blue: getButtonStyles(ButtonVariant.Blue),
};
