import React, { useEffect, useState } from 'react';
import { Stack } from '../../designSystem/components/Stack/Stack';
import { Dimensions, ScrollView, View } from 'react-native';
import { HseText } from '../../designSystem/components/HseText/HseText';
import { formatEventPeriod } from './helpers';
import { HseButton } from '../../designSystem/components/HseButton/HseButton';
import { EventInfoStyle } from './EventInfo.style';
import { openURL } from 'expo-linking';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { EventStackParamList } from '../../app/Layout/routes/EventsRoute';
import { appEventModel } from '../../../utils/models/models';
import { HseEvent } from '../../../repositories/EventsRepository/EventsRepository.interface';
import { GoBackButton } from '../../designSystem/components/GoBackButton/GoBackButton';
import { GoBackButtonBlured } from '../../designSystem/components/GoBackButton/GoBackButtonBlured';
import { colorPalette } from '../../designSystem/constants.style';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigationState } from '@react-navigation/native';
import { useAuth } from '../../app/Auth/AuthContext/AuthContext';
import { Feather, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { ProfileStackParamList } from '../../app/Layout/routes/ProfileRoute';
import Toast from 'react-native-toast-message';

export type EventInfoRouteParams = {
    eventId: number;
    source?: 'Events' | 'Profile';
};
type EventInfoProps = NativeStackScreenProps<EventStackParamList & ProfileStackParamList, 'EventInfo'>;

export const EventInfo = ({ navigation, route }: EventInfoProps) => {
    const { eventId } = route.params;
    const { user } = useAuth();

    const routeNames = useNavigationState(state => state.routeNames);

    const [data, setData] = useState<HseEvent>();
    const [isError, setIsError] = useState<boolean>();

    const [joined, setJoined] = useState<boolean>();

    const [r, refetch] = useState(false);

    useEffect(() => {
        const request = async () => {
            try {
                const response = await appEventModel.getEventById(eventId);
                setData(response);
                setJoined(user ? response.participants.includes(user.id) : false);
            } catch {
                setIsError(true);
            }
        };

        request();
    }, [r]);

    if (!data) {
        return null;
    }

    const start = new Date(data.start);
    const end = new Date(data.end);

    const startString = start.toLocaleDateString('ru-RU', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
    });

    const eventPeriod = formatEventPeriod(start, end);

    const onMoreInfoPress = () => {
        openURL('https://google.com');
    };

    const onRegistrationPress = () => {
        openURL('https://google.com');
    };

    const onGoBackPress = () => {
        navigation.goBack();
    };

    const onDeletePress = () => {
        appEventModel.deleteEvent(eventId);
        navigation.goBack();

        Toast.show({
            type: 'tomatoToast',
            text1: `Событие удалено!`,
        });
        setTimeout(() => {
            Toast.hide();
        }, 2000);
    };

    const onJoinPress = () => {
        if (!user) {
            return;
        }
        if (!joined) {
            appEventModel.joinEvent(user.id, data.id).then(_ => setJoined(true));
        } else {
            appEventModel.leaveEvent(user.id, data.id).then(_ => setJoined(false));
        }

        refetch(prev => !prev);
    };

    return (
        <SafeAreaView
            style={{
                height: '100%',
                backgroundColor: colorPalette.backgroundPrimary,
            }}
        >
            <Stack
                padding="big"
                style={{
                    width: '100%',
                    height: Dimensions.get('window').height * 0.9,
                    paddingBottom: 0,
                }}
            >
                <Stack
                    justify="space-between"
                    gap="big"
                    direction="row"
                    style={[EventInfoStyle.maxWidth]}
                >
                    <Stack
                        justify="flex-start"
                        gap="big"
                        direction="row"
                    >
                        <GoBackButton onPress={onGoBackPress} />
                        <HseText
                            variant="title"
                            size={24}
                        >
                            Событие
                        </HseText>
                    </Stack>
                    <Stack
                        direction="row"
                        justify="flex-start"
                        gap="medium"
                    >
                        {user && (
                            <HseButton
                                color={joined ? 'blue' : 'transparent'}
                                onPress={onJoinPress}
                            >
                                <MaterialIcons
                                    name="event-available"
                                    color={joined ? colorPalette.backgroundPrimary : colorPalette.textPrimary}
                                    size={24}
                                />
                            </HseButton>
                        )}
                        {user?.role === 'creator' && (
                            <HseButton
                                color="transparent"
                                style={{ marginLeft: 'auto' }}
                                onPress={onDeletePress}
                            >
                                <MaterialCommunityIcons
                                    name="trash-can"
                                    size={24}
                                />
                            </HseButton>
                        )}
                    </Stack>
                </Stack>
                <View style={EventInfoStyle.delimiter} />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Stack
                        gap="medium-big"
                        align="flex-start"
                        justify="flex-start"
                        style={{ minHeight: '100%' }}
                    >
                        <HseText
                            variant="title"
                            size={28}
                        >
                            {data.title}
                        </HseText>
                        <Stack
                            gap="medium"
                            align="flex-start"
                        >
                            <View style={EventInfoStyle.fieldWithIcon}>
                                <MaterialIcons
                                    name="calendar-today"
                                    size={24}
                                />
                                <HseText size={20}>{startString}</HseText>
                            </View>
                            <View style={EventInfoStyle.fieldWithIcon}>
                                <Feather
                                    name="clock"
                                    size={24}
                                />
                                <HseText size={20}>{eventPeriod}</HseText>
                            </View>
                            <View style={EventInfoStyle.fieldWithIcon}>
                                <MaterialIcons
                                    name="place"
                                    size={24}
                                />
                                <HseText size={20}>{data.place}</HseText>
                            </View>
                            <View style={EventInfoStyle.fieldWithIcon}>
                                <MaterialIcons
                                    name="person"
                                    size={24}
                                />
                                <HseText size={20}>{`${data.participants.length} участников`}</HseText>
                            </View>
                        </Stack>
                        <HseText
                            size={26}
                            variant="title"
                            color="textSecondary"
                        >
                            Описание
                        </HseText>
                        <HseText>{data.description}</HseText>
                        <Stack
                            direction="row"
                            justify="space-between"
                            style={[EventInfoStyle.maxWidth, { marginTop: 'auto' }]}
                        >
                            <HseButton
                                onPress={onMoreInfoPress}
                                color="gray"
                                width={'38%'}
                            >
                                <HseText size={18}>Подробнее</HseText>
                            </HseButton>
                            <HseButton
                                onPress={onRegistrationPress}
                                color="blue"
                                width={'60%'}
                            >
                                <HseText
                                    size={18}
                                    color="backgroundPrimary"
                                >
                                    Зарегистрироваться
                                </HseText>
                            </HseButton>
                        </Stack>
                    </Stack>
                </ScrollView>
            </Stack>
        </SafeAreaView>
    );
};
