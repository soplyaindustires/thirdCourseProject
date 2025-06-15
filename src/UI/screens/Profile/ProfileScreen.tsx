import { Dimensions, Pressable, View, Text } from 'react-native';
import { HseButton } from '../../designSystem/components/HseButton/HseButton';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../app/Auth/AuthProvider';
import { profileScreenStyle } from './ProfileScreen.style';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from '../../designSystem/components/Stack/Stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { HseText } from '../../designSystem/components/HseText/HseText';
import { useAuth } from '../../app/Auth/AuthContext/AuthContext';
import { colorPalette } from '../../designSystem/constants.style';
import React, { useMemo } from 'react';
import { ProfileStackParamList } from '../../app/Layout/routes/ProfileRoute';
import Toast from 'react-native-toast-message';

type ProfileScreenProps = NativeStackScreenProps<ProfileStackParamList, 'ProfileScreen'>;

export const ProfileScreen = ({ navigation }: ProfileScreenProps) => {
    //юзаем навигацию Auth-навигатора, потому что так надо
    const authNavigation = useNavigation<NativeStackScreenProps<AuthStackParamList>['navigation']>();
    const { user, logout } = useAuth();

    const onLogoutPress = () => {
        logout();
        authNavigation.replace('Login');
    };

    const onLoginPress = () => {
        authNavigation.replace('Login');
    };

    const adminRouteButtons = useMemo(() => {
        return [
            {
                text: 'Мои события',
                onPress: () => {
                    navigation.navigate('CreatedEvents');
                },
            },
            {
                text: 'Создать событие',
                onPress: () => {
                    navigation.navigate('CreateEvent');
                },
            },
        ];
    }, [user]);

    if (!user) {
        return (
            <SafeAreaView
                mode="margin"
                style={{ display: 'flex', height: '100%' }}
            >
                <Stack
                    style={profileScreenStyle.screen}
                    gap="large"
                    maxWidth
                    maxHeight
                >
                    <HseText>Вы не вошли в систему</HseText>
                    <HseButton
                        color="blue"
                        onPress={onLoginPress}
                        width={'35%'}
                    >
                        <HseText color="backgroundPrimary">Войти</HseText>
                    </HseButton>
                </Stack>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView
            mode="margin"
            style={{ display: 'flex', height: '100%', paddingBottom: 32 }}
        >
            <Stack
                justify="flex-start"
                align="flex-start"
                style={profileScreenStyle.screen}
                padding="big"
            >
                <Stack
                    direction="row"
                    justify="flex-start"
                    gap="big"
                    maxWidth
                    style={profileScreenStyle.userData}
                >
                    <View style={profileScreenStyle.circle}>
                        <MaterialCommunityIcons
                            name="account"
                            size={30}
                            color="black"
                        />
                    </View>
                    <Stack align="flex-start">
                        <HseText
                            size={18}
                            variant="title"
                        >
                            {user.fullName}
                        </HseText>
                        <Stack
                            justify="flex-start"
                            direction="row"
                        >
                            <HseText
                                size={14}
                                color="textSecondary"
                                numberOfLines={2}
                                textBreakStrategy="highQuality"
                                style={{ width: '90%' }}
                            >{`${user.educationalProgram}. ${user.course}-й курс, ${user.group}`}</HseText>
                        </Stack>
                    </Stack>
                </Stack>
                <Stack
                    justify="space-between"
                    align="flex-start"
                    maxWidth
                    style={{ flexGrow: 1 }}
                >
                    <Stack
                        justify="flex-start"
                        gap="medium"
                        maxWidth
                    >
                        {user.role === 'creator' &&
                            adminRouteButtons.map(({ text, onPress }) => (
                                <React.Fragment key={text}>
                                    <Pressable
                                        onPress={onPress}
                                        style={({ pressed }) => [
                                            {
                                                backgroundColor: pressed
                                                    ? colorPalette.backgroundSecondary
                                                    : colorPalette.backgroundPrimary,
                                            },
                                            profileScreenStyle.button,
                                        ]}
                                    >
                                        <HseText>{text}</HseText>
                                    </Pressable>
                                    <View style={profileScreenStyle.delimiter}></View>
                                </React.Fragment>
                            ))}
                    </Stack>
                    <HseButton
                        onPress={onLogoutPress}
                        color="transparent"
                        width={'100%'}
                    >
                        <HseText color="textPrimary">Выйти</HseText>
                    </HseButton>
                </Stack>
            </Stack>
        </SafeAreaView>
    );
};
