import React, { ReactNode } from 'react';
import { View, ViewStyle, StyleProp } from 'react-native';
import { borderRadiusPalette, paddingPalette } from '../../constants.style';

type FlexDirection = 'row' | 'column';
type AlignItems = 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
type JustifyContent = 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
type Gap = keyof typeof paddingPalette;
type Padding = keyof typeof paddingPalette;
type BorderRadius = keyof typeof borderRadiusPalette;

type StackProps = {
    direction?: FlexDirection;
    align?: AlignItems;
    justify?: JustifyContent;
    gap?: Gap;
    padding?: Padding;
    borderRadius?: BorderRadius;
    style?: StyleProp<ViewStyle>;
    children: ReactNode;
};

export const Stack: React.FC<StackProps> = ({
    direction = 'column',
    align = 'center',
    justify = 'center',
    gap = 'none',
    borderRadius = 'none',
    padding = 'none',
    style,
    children,
}) => {
    const containerStyle: ViewStyle = {
        display: 'flex',
        flexDirection: direction,
        alignItems: align,
        justifyContent: justify,
        gap: paddingPalette[gap],
        padding: paddingPalette[padding],
        borderRadius: borderRadiusPalette[borderRadius],
    };

    return (
        <View style={[containerStyle, style]}>
            {/* {React.Children.map(children, (child, index) => (
                <View
                    key={index}
                    style={{ flexShrink: 0 }}
                >
                    {child}
                </View>
            ))} */}
            {children}
        </View>
    );
};
