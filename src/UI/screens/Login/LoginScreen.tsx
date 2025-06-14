import { HseButton } from '../../designSystem/components/HseButton/HseButton';
import { Pressable, TextInput, Touchable, TouchableOpacity, View } from 'react-native';
import { LoginScreenStyle } from './LoginScreen.style';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../app/Auth/AuthProvider';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HseText } from '../../designSystem/components/HseText/HseText';
import { Stack } from '../../designSystem/components/Stack/Stack';
import { useAuth } from '../../app/Auth/AuthContext/AuthContext';
import { colorPalette } from '../../designSystem/constants.style';
import { Image } from 'expo-image';
import { Feather } from '@expo/vector-icons';

type LoginScreenProps = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export const LoginScreen = ({ navigation }: LoginScreenProps) => {
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

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

    const onPasswordWatch = () => {
        setPasswordVisible(prev => !prev);
    };

    return (
        <SafeAreaView>
            <Stack
                style={LoginScreenStyle.screen}
                padding="large"
            >
                <Stack style={LoginScreenStyle.top}>
                    <Image
                        source={require('./assets/hselogo.svg')}
                        style={{ width: 150, height: 150 }}
                    />
                    <HseText
                        size={36}
                        variant="title"
                        color="primaryDark"
                    >
                        HSE Event
                    </HseText>
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
                    <Stack
                        direction="row"
                        justify="space-between"
                        style={[
                            LoginScreenStyle.input,
                            {
                                borderColor: wrongCredits ? '#900' : colorPalette.textSecondary,
                                backgroundColor: wrongCredits ? '#ffb3bb' : colorPalette.backgroundSecondary,
                            },
                        ]}
                    >
                        <TextInput
                            style={{ fontSize: 20 }}
                            placeholder="Пароль"
                            textContentType="password"
                            secureTextEntry={!passwordVisible}
                            value={password}
                            onChangeText={onPasswordChange}
                            autoCapitalize="none"
                        />
                        <Pressable onPress={onPasswordWatch}>
                            <Feather
                                name={passwordVisible ? 'eye' : 'eye-off'}
                                size={20}
                            />
                        </Pressable>
                    </Stack>
                    <HseButton
                        color="transparent"
                        onPress={onLoginPress}
                        width={'100%'}
                        style={{
                            borderWidth: 1,
                            borderColor: '#ccc',
                        }}
                    >
                        <HseText color="textSecondary">Войти</HseText>
                    </HseButton>
                </Stack>
                <Stack
                    style={LoginScreenStyle.bottom}
                    justify="flex-end"
                >
                    <Pressable onPress={onWithoutLoginPress}>
                        <HseText
                            color="textSecondary"
                            size={16}
                            align="center"
                            numberOfLines={1}
                            style={{
                                textDecorationLine: 'underline',
                            }}
                        >
                            Продолжить без авторизации
                        </HseText>
                    </Pressable>
                </Stack>
            </Stack>
        </SafeAreaView>
    );
};
