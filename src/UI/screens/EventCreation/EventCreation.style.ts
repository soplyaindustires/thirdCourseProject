import { StyleSheet } from 'react-native';
import { borderRadiusPalette, colorPalette, paddingPalette } from '../../designSystem/constants.style';

export const EventCreationStyle = StyleSheet.create({
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: borderRadiusPalette.medium,
        paddingHorizontal: paddingPalette.big,
        marginBottom: paddingPalette.medium,
        fontSize: 20,
    },
    timeContainer: {
        borderRadius: borderRadiusPalette.medium,
        borderColor: '#ccc',
        borderWidth: 1,
        paddingTop: paddingPalette.small,
        paddingBottom: paddingPalette.small,
        paddingLeft: paddingPalette['medium-big'],
        paddingRight: paddingPalette['medium-big'],
        width: '100%',
    },
    timeSplitter: {
        height: '100%',
        width: 1,
        backgroundColor: '#ccc',
    },
});
