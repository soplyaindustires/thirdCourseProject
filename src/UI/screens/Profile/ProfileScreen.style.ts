import { StyleSheet } from 'react-native';
import { colorPalette } from '../../designSystem/constants.style';

export const profileScreenStyle = StyleSheet.create({
    screen: {
        backgroundColor: colorPalette.backgroundPrimary,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
    },
});
