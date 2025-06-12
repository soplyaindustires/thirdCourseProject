import { StyleSheet } from 'react-native';
import { borderRadiusPalette, colorPalette, paddingPalette } from '../../designSystem/constants.style';
import { delimiter } from 'path';

export const profileScreenStyle = StyleSheet.create({
    screen: {
        backgroundColor: colorPalette.backgroundPrimary,
        flex: 1,
    },
    userData: {
        marginBottom: paddingPalette['medium-big'],
    },
    circle: {
        borderRadius: '100%',
        backgroundColor: '#fff', //'#f6f6f6',
        borderColor: colorPalette.textSecondary,
        borderWidth: 1,
        padding: paddingPalette.big,
    },
    delimiter: {
        backgroundColor: colorPalette.backgroundAccent,
        height: 1,
        borderRadius: 100,
        width: '95%',
    },
    button: {
        padding: paddingPalette.medium,
        borderRadius: borderRadiusPalette['medium-big'],
        width: '100%',
        textAlign: 'left',
    },
});
