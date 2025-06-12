import { PropsWithChildren } from 'react';
import { DimensionValue, Pressable, Text, TextStyle } from 'react-native';
import { HseButtonStyle } from './HseButton.style';
import { Stack } from '../Stack/Stack';

type HseButtonProps = PropsWithChildren<{
    /**
     * ширина
     * @default 50
     */
    width?: DimensionValue;
    /**
     * Цвет кнопки в соответствии с дизайн системой
     */
    color: 'gray' | 'blue';
    /**
     * Обработчик нажатия на кнопку
     */
    onPress?: () => void;
}>;

export const HseButton = ({ onPress, color, width = 50, children }: HseButtonProps) => {
    return (
        <Pressable
            onPress={onPress}
            style={{ width }}
        >
            <Stack
                padding="medium-big"
                borderRadius="big"
                style={[HseButtonStyle[color].body]}
            >
                {children}
            </Stack>
        </Pressable>
    );
};
