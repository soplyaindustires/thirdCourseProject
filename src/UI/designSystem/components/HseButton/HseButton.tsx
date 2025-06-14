import { PropsWithChildren } from 'react';
import { DimensionValue, Pressable, Text, TextStyle, ViewStyle } from 'react-native';
import { HseButtonStyle } from './HseButton.style';
import { Stack, StackProps } from '../Stack/Stack';

type HseButtonProps = PropsWithChildren<{
    /**
     * ширина
     * @default 50
     */
    width?: DimensionValue;
    /**
     * Цвет кнопки в соответствии с дизайн системой
     */
    color: 'gray' | 'blue' | 'transparent';
    /**
     * Обработчик нажатия на кнопку
     */
    onPress?: () => void;
    /**
     * Расположение текста
     * @default "center"
     */
    align?: StackProps['align'];
    /**
     * Доп стили
     */
    style?: ViewStyle;
}>;

export const HseButton = ({ onPress, color, width = 50, children, align, style }: HseButtonProps) => {
    return (
        <Pressable
            onPress={onPress}
            style={[{ width }]}
        >
            <Stack
                padding="medium-big"
                borderRadius="big"
                style={[HseButtonStyle[color].body, style]}
                align={align}
            >
                {children}
            </Stack>
        </Pressable>
    );
};
