import { Platform, StyleSheet } from 'react-native';
import { colorPalette, paddingPalette } from '../../../designSystem/constants.style';

export const customTabBarStyle = StyleSheet.create({
    tabBar: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: colorPalette.backgroundPrimary,
        paddingTop: paddingPalette.big,
        borderTopColor: '#ddd',
        borderTopWidth: 1,
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconContainer: {
        paddingBottom: paddingPalette.small,
    },
});
