import React from 'react';
import { Stack } from '../../designSystem/components/Stack/Stack';
import { SafeAreaView, View } from 'react-native';
import { HseText } from '../../designSystem/components/HseText/HseText';
import { dummyEvents } from '../../widgets/EventList/dummyEvent';
import { ScrollView } from 'react-native-reanimated/lib/typescript/Animated';
import { formatEventPeriod } from './helpers';
import { HseButton } from '../../designSystem/components/HseButton/HseButton';
import { EventInfoStyle } from './EventInfo.style';
import { openURL } from 'expo-linking';

type EventInfoProps = {
    eventId: number;
};

export const EventInfo = ({ eventId }: EventInfoProps) => {
    const data = dummyEvents.find(({ id }) => id === eventId);

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
        // Добавить внесение в регистрацию
        openURL('https://google.com');
    };

    return (
        <SafeAreaView>
            <Stack padding="big">
                <View>
                    <HseText>Событие</HseText>
                </View>
                <View style={EventInfoStyle.delimiter} />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Stack gap="medium-big">
                        <HseText variant="title">{data.name}</HseText>
                        <Stack gap="medium">
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
                        <Stack direction="row">
                            <HseButton
                                onPress={onMoreInfoPress}
                                color="gray"
                            >
                                Подробнее
                            </HseButton>
                            <HseButton
                                onPress={onRegistrationPress}
                                color="blue"
                            >
                                Зарегистрироваться
                            </HseButton>
                        </Stack>
                    </Stack>
                </ScrollView>
            </Stack>
        </SafeAreaView>
    );
};
