import { BaseToast, BaseToastProps, ToastProps } from 'react-native-toast-message';
import { borderRadiusPalette, colorPalette, paddingPalette } from '../../designSystem/constants.style';
import { View, Text } from 'react-native';

export const toastConfig = {
    tomatoToast: ({ text1 }: BaseToastProps) => (
        <View
            style={{
                height: 50,
                width: '85%',
                backgroundColor: colorPalette.backgroundPrimary,
                borderColor: '#bbb',
                borderWidth: 1,
                borderRadius: borderRadiusPalette.big,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                shadowRadius: 10,
                boxShadow: [
                    {
                        offsetX: 1,
                        offsetY: 1,
                        blurRadius: 2,
                        color: 'rgba(0, 0, 0, 0.2)',
                    },
                ],
                padding: paddingPalette['medium-big'],
            }}
        >
            <Text
                numberOfLines={2}
                textBreakStrategy="highQuality"
                style={{ color: colorPalette.textSecondary, fontSize: 16, fontFamily: 'SegoeUI', flexShrink: 1 }}
            >
                {text1}
            </Text>
        </View>
    ),
};
