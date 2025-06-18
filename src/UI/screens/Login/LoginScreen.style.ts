import { StyleSheet } from 'react-native';
import { borderRadiusPalette, colorPalette, paddingPalette } from '../../designSystem/constants.style';

export const LoginScreenStyle = StyleSheet.create({
    screen: {
        height: '100%',
        width: '100%',
        backgroundColor: colorPalette.backgroundPrimary,
    },
    top: {
        flex: 1,
        width: '100%',
        gap: 8,
    },
    auth: {
        flex: 1,
        width: '100%',
    },
    bottom: {
        flex: 0.8,
        width: '100%',
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: borderRadiusPalette.big,
        paddingHorizontal: paddingPalette.big,
        marginBottom: paddingPalette.medium,
        fontSize: 20,
    },
});
