import { View } from 'react-native';
import { HseButton } from '../../designSystem/components/HseButton/HseButton';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../app/Auth/AuthProvider';
import { profileScreenStyle } from './ProfileScreen.style';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from '../../designSystem/components/Stack/Stack';

export const ProfileScreen = () => {
    //юзаем навигацию Auth-навигатора, потому что так надо
    const navigation = useNavigation<NativeStackScreenProps<AuthStackParamList>['navigation']>();

    const onPress = () => {
        navigation.replace('Login');
    };

    return (
        <SafeAreaView>
            <Stack style={profileScreenStyle.screen}>
                <HseButton
                    onPress={onPress}
                    color="gray"
                >
                    Выйти
                </HseButton>
            </Stack>
        </SafeAreaView>
    );
};
