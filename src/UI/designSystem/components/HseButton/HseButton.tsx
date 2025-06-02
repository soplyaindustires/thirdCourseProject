import { PropsWithChildren } from 'react';
import { Pressable, Text } from 'react-native';
import { HseButtonStyle } from './HseButton.style';

type HseButtonProps = {
    /**
     * Текст кнопки
     */
    text: string;
    /**
     * ширина
     * @default 50
     */
    width?: number;
    /**
     * Цвет кнопки в соответствии с дизайн системой
     */
    color: 'gray' | 'blue';
    /**
     * Обработчик нажатия на кнопку
     */
    onPress?: () => void;
};

export const HseButton = ({ onPress, text, color, width = 50 }: HseButtonProps) => {
    return (
        <Pressable
            onPress={onPress}
            style={[HseButtonStyle[color].body, { width: width }]}
        >
            <Text style={HseButtonStyle[color].text}>{text}</Text>
        </Pressable>
    );
};
