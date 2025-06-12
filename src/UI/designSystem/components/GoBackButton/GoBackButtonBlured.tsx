import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type GoBackButtonProps = {
    onPress?: () => void;
};

export const GoBackButtonBlured = ({ onPress }: GoBackButtonProps) => {
    return (
        <TouchableOpacity
            style={styles.buttonContainer}
            onPress={onPress}
        >
            <View
                style={styles.blur}
                // blurType="light"
                // blurAmount={10}
                // reducedTransparencyFallbackColor="rgba(255, 255, 255, 0.1)"
            >
                <MaterialCommunityIcons
                    name="arrow-left"
                    size={24}
                    color="#fff"
                />
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        borderRadius: 12,
        overflow: 'hidden',
        // Тень для iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        // Эффект для Android
        elevation: 6,
    },
    blur: {
        padding: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.1)', // Запасной фон для Android
    },
});
