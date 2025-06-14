import { StyleSheet } from 'react-native';
import { borderRadiusPalette, colorPalette, paddingPalette } from '../../designSystem/constants.style';

export const EventInfoStyle = StyleSheet.create({
    delimiter: {
        backgroundColor: colorPalette.backgroundAccent,
        width: '100%',
        height: 2,
        borderRadius: borderRadiusPalette.big,
        marginTop: paddingPalette['medium-big'],
        marginBottom: paddingPalette.medium,
    },
    maxWidth: {
        width: '100%',
    },
    fieldWithIcon: {
        display: 'flex',
        gap: 8,
        flexDirection: 'row',
        alignItems: 'center',
    },
});
