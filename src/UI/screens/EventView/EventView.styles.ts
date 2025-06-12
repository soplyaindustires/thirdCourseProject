import { StyleSheet } from 'react-native';
import { colorPalette } from '../../designSystem/constants.style';

export const EventViewStyle = StyleSheet.create({
    screen: {
        backgroundColor: colorPalette.backgroundPrimary,
        width: '100%',
        borderWidth: 0,
        borderColor: '#000',
    },
    listWrapper: {
        width: '100%',
        height: '100%',
    },
});
