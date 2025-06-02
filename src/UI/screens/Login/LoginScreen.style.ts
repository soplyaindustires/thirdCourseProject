import { StyleSheet } from 'react-native';
import { borderRadiusPalette, paddingPalette } from '../../designSystem/constants.style';

export const LoginScreenStyle = StyleSheet.create({
    screen: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: borderRadiusPalette.medium,
        paddingHorizontal: paddingPalette.big,
        marginBottom: paddingPalette.medium,
        fontSize: 16,
    },
});
