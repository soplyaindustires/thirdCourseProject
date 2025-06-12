import { HseButton } from '../../designSystem/components/HseButton/HseButton';
import { Pressable, TextInput, View } from 'react-native';
import { LoginScreenStyle } from './LoginScreen.style';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../app/Auth/AuthProvider';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HseText } from '../../designSystem/components/HseText/HseText';
import { Stack } from '../../designSystem/components/Stack/Stack';
import { useAuth } from '../../app/Auth/AuthContext/AuthContext';
import { colorPalette } from '../../designSystem/constants.style';

type LoginScreenProps = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export const LoginScreen = ({ navigation }: LoginScreenProps) => {
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [wrongCredits, setWrongCredits] = useState<boolean>(false);

    const { login: authorizeUser } = useAuth();

    const onLoginPress = () => {
        authorizeUser(login.trim(), password.trim())
            .then(() => {
                navigation.replace('Main');
            })
            .catch(err => {
                console.log('error');
                setWrongCredits(true);
            });
    };

    const onWithoutLoginPress = () => {
        navigation.replace('Main');
    };

    const onLoginChange = (text: string) => {
        if (wrongCredits) {
            setWrongCredits(false);
        }

        setLogin(text);
    };

    const onPasswordChange = (text: string) => {
        if (wrongCredits) {
            setWrongCredits(false);
        }

        setPassword(text);
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
                        style={[
                            LoginScreenStyle.input,
                            {
                                borderColor: wrongCredits ? '#900' : colorPalette.textSecondary,
                                backgroundColor: wrongCredits ? '#ffb3bb' : colorPalette.backgroundSecondary,
                            },
                        ]}
                        placeholder="Логин"
                        value={login}
                        onChangeText={onLoginChange}
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={[
                            LoginScreenStyle.input,
                            {
                                borderColor: wrongCredits ? '#900' : colorPalette.textSecondary,
                                backgroundColor: wrongCredits ? '#ffb3bb' : colorPalette.backgroundSecondary,
                            },
                        ]}
                        placeholder="Пароль"
                        textContentType="password"
                        secureTextEntry
                        value={password}
                        onChangeText={onPasswordChange}
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
