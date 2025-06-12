import { StyleSheet } from 'react-native';
import { borderRadiusPalette, colorPalette, paddingPalette } from '../../designSystem/constants.style';

export const LoginScreenStyle = StyleSheet.create({
    screen: {
        height: '100%',
        width: '100%',
        backgroundColor: colorPalette.backgroundPrimary,
    },
    top: {
        flexGrow: 1,
        width: '100%',
    },
    auth: {
        flexGrow: 1,
        width: '100%',
    },
    bottom: {
        flexGrow: 1,
        width: '100%',
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: borderRadiusPalette.medium,
        paddingHorizontal: paddingPalette.big,
        marginBottom: paddingPalette.medium,
        fontSize: 16,
    },
});
