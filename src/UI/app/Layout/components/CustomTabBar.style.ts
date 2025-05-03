import { Platform, StyleSheet } from 'react-native';

export const customTabBarStyle = StyleSheet.create({
    tabBar: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
        paddingTop: 10,
        elevation: 5,
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconContainer: {
        marginBottom: 4,
    },
    label: {
        fontSize: 12,
        fontWeight: '600',
    },
});
