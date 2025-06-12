import React from 'react';
import { Text, StyleSheet, TextStyle, TextProps } from 'react-native';
import { colorPalette, paddingPalette, typography } from '../../constants.style'; // Adjust path as needed

// Define possible typography variants based on the provided typography styles
type TypographyVariant = keyof typeof typography;

// Define possible color options from colorPalette
type ColorVariant = keyof typeof colorPalette;

// Define possible padding options
type PaddingVariant = keyof typeof paddingPalette;

// Props for the HseText component
interface HseTextProps extends TextProps {
    variant?: TypographyVariant; // e.g., 'title' or 'text'
    color?: ColorVariant; // e.g., 'textPrimary', 'primary'
    size?: number; // Font size in pixels
    padding?: PaddingVariant; // Padding from paddingPalette
    align?: 'left' | 'center' | 'right'; // Text alignment
    style?: TextStyle; // Allow custom styles to be passed
}

export const HseText: React.FC<HseTextProps> = ({
    variant = 'text',
    color = 'textPrimary',
    size = 20,
    padding = 'none',
    align = 'left',
    style,
    children,
    ...rest
}) => {
    return (
        <Text
            style={[
                typography[variant], // Apply base typography style (title or text)
                {
                    color: colorPalette[color], // Apply color from palette
                    fontSize: size, // Apply custom font size if provided
                    padding: paddingPalette[padding], // Apply padding from palette
                    textAlign: align, // Apply text alignment
                },
                style, // Merge with any custom styles
            ]}
            textBreakStrategy="balanced"
            lineBreakMode="head"
            {...rest} // Pass through other Text props like numberOfLines, onPress, etc.
        >
            {children}
        </Text>
    );
};
