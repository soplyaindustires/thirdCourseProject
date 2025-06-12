import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { borderRadiusPalette, paddingPalette } from '../../constants.style';

type GoBackButtonProps = {
    onPress?: () => void;
};

export const GoBackButton = ({ onPress }: GoBackButtonProps) => {
    return (
        <TouchableOpacity
            style={styles.button}
            onPress={onPress}
        >
            <MaterialCommunityIcons
                name="arrow-left"
                size={24}
                color="#000"
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        padding: paddingPalette.medium,
        borderRadius: borderRadiusPalette['medium-big'],
        backgroundColor: 'transparent',
    },
});
