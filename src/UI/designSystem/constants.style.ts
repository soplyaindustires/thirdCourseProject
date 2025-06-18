import { StyleSheet } from 'react-native';

/**
 * Палитра цветов, используемых в приложении
 */
export const colorPalette = {
    /**
     * Основной цвет бренда (типо вшэ) - синий
     */
    primary: '#007aff',
    /**
     * Основной цвет бренда потемнее
     */
    primaryDark: '#004896',
    /**
     * Основной цвет фона (белый)
     */
    backgroundPrimary: '#fff',
    /**
     * Вторичный цвет фона (очень очень светло серый).
     * например для карточки события
     */
    backgroundSecondary: '#f9f9f9',
    /**
     * Акцентный цвет фона (слегка серый).
     * Используется, когда нужно выделить что-то на основном фоне
     * пример - кнопка "подробнее" на экране события в фигме
     */
    backgroundAccent: '#f0f0f0',
    /**
     * Основной цвет текста (просто чёрный)
     */
    textPrimary: '#000',
    /**
     * Второй цвет текста (серый)
     */
    textSecondary: '#666',
};

/**
 * Использовать везде, где есть свойство "padding"
 */
export const paddingPalette = {
    none: 0,
    small: 4,
    medium: 8,
    'medium-big': 12,
    big: 16,
    large: 32,
};

/**
 * Использовать везде, где есть свойство "border-radius"
 */
export const borderRadiusPalette = {
    none: 0,
    small: 4,
    medium: 8,
    'medium-big': 12,
    big: 16,
};

/**
 * стили для текста
 */
export const typography = StyleSheet.create({
    title: {
        fontFamily: 'SegoeUI',
        fontWeight: '700',
    },
    text: {
        fontFamily: 'SegoeUI',
        fontWeight: '400',
    },
});
