import { View } from 'react-native';
import { HseButton } from '../../designSystem/components/HseButton/HseButton';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../app/Auth/AuthProvider';
import { profileScreenStyle } from './ProfileScreen.style';

export const ProfileScreen = () => {
    //юзаем навигацию Auth-навигатора, потому что так надо
    const navigation = useNavigation<NativeStackScreenProps<AuthStackParamList>['navigation']>();

    const onPress = () => {
        navigation.replace('Login');
    };

    return (
        <View style={profileScreenStyle.screen}>
            <HseButton
                onPress={onPress}
                text="Ыойти"
                color="gray"
            />
        </View>
    );
};
