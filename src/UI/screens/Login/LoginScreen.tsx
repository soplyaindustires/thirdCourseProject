import { HseButton } from '../../designSystem/components/HseButton/HseButton';
import { TextInput, View } from 'react-native';
import { LoginScreenStyle } from './LoginScreen.style';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../app/Auth/AuthProvider';
import { useState } from 'react';

type LoginScreenProps = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export const LoginScreen = ({ navigation }: LoginScreenProps) => {
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const onLoginPress = () => {
        navigation.replace('Main');
    };

    const onWithoutLoginPress = () => {
        navigation.replace('Main');
    };

    return (
        <View style={LoginScreenStyle.screen}>
            <TextInput
                style={LoginScreenStyle.input}
                placeholder="Логин"
                value={login}
                onChangeText={setLogin}
                autoCapitalize="none"
            />
            <TextInput
                style={LoginScreenStyle.input}
                placeholder="Пароль"
                value={password}
                onChangeText={setPassword}
                autoCapitalize="none"
            />
            <HseButton
                text="Войти"
                color="blue"
                onPress={onLoginPress}
            />
            <HseButton
                text="Продолжить без авторизации"
                color="gray"
                onPress={onWithoutLoginPress}
            />
        </View>
    );
};
