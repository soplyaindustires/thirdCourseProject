import { StyleSheet } from 'react-native';
import { paddingPalette } from '../../../../designSystem/constants.style';

export const EventStyle = StyleSheet.create({
    container: {
        backgroundColor: '#f9f9f9',
        padding: paddingPalette.large,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingBottom: paddingPalette.medium,
    },
    date: {
        fontSize: 14,
        color: '#555',
        paddingBottom: paddingPalette.small,
    },
    location: {
        fontSize: 14,
        color: '#555',
        paddingBottom: paddingPalette.small,
    },
});
