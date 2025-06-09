import { StyleSheet } from 'react-native';
import { colorPalette, paddingPalette } from '../../../../designSystem/constants.style';

export const EventStyle = StyleSheet.create({
    content: {
        width: '100%',
        backgroundColor: colorPalette.backgroundSecondary,
    },
    dateContainer: {
        backgroundColor: colorPalette.backgroundPrimary,
        borderWidth: 1,
        borderColor: colorPalette.backgroundAccent,
        width: 60,
        height: 60,
    },
});
