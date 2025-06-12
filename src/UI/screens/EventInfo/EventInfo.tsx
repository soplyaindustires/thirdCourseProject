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
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ProfileStackParamList } from '../../app/Layout/routes/ProfileRoute';

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

    useEffect(() => {
        const request = async () => {
            try {
                const response = await appEventModel.getEventById(eventId);
                setData(response);
            } catch {
                setIsError(true);
            }
        };

        request();
    }, []);

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
        // navigation.navigate()
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
                    justify="flex-start"
                    gap="big"
                    direction="row"
                    style={[EventInfoStyle.maxWidth]}
                >
                    <GoBackButton onPress={onGoBackPress} />
                    <HseText
                        variant="title"
                        size={24}
                    >
                        Событие
                    </HseText>
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
                            size={24}
                        >
                            {data.title}
                        </HseText>
                        <Stack
                            gap="medium"
                            align="flex-start"
                        >
                            <View>
                                <HseText>{startString}</HseText>
                            </View>
                            <View>
                                <HseText>{eventPeriod}</HseText>
                            </View>
                            <View>
                                <HseText>{data.place}</HseText>
                            </View>
                        </Stack>
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
