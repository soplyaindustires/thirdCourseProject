import { HseButton } from '../../designSystem/components/HseButton/HseButton';
import { Pressable, TextInput, View } from 'react-native';
import { LoginScreenStyle } from './LoginScreen.style';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../app/Auth/AuthProvider';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HseText } from '../../designSystem/components/HseText/HseText';
import { Stack } from '../../designSystem/components/Stack/Stack';

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
        <SafeAreaView>
            <Stack
                style={LoginScreenStyle.screen}
                padding="large"
            >
                <Stack style={LoginScreenStyle.top}>
                    <HseText>HSE Event</HseText>
                </Stack>
                <Stack style={LoginScreenStyle.auth}>
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
                        color="blue"
                        onPress={onLoginPress}
                        width={'35%'}
                    >
                        <HseText color="backgroundPrimary">Войти</HseText>
                    </HseButton>
                </Stack>
                <Stack
                    style={LoginScreenStyle.bottom}
                    justify="flex-end"
                >
                    <Pressable onPress={onWithoutLoginPress}>
                        <HseText
                            size={16}
                            align="center"
                            numberOfLines={1}
                        >
                            Продолжить без авторизации
                        </HseText>
                    </Pressable>
                </Stack>
            </Stack>
        </SafeAreaView>
    );
};
