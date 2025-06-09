import React from 'react';
import { Stack } from '../../designSystem/components/Stack/Stack';
import { View } from 'react-native';
import { HseText } from '../../designSystem/components/HseText/HseText';
import { dummyEvents } from '../../widgets/EventList/dummyEvent';
import { ScrollView } from 'react-native-reanimated/lib/typescript/Animated';

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

    // const day

    return (
        <Stack padding="big">
            <View>
                <HseText>Событие</HseText>
            </View>
            <View />
            <ScrollView showsVerticalScrollIndicator={false}>
                <Stack gap="medium-big">
                    <HseText variant="title">{data.name}</HseText>
                    <Stack gap="medium">
                        <View>
                            <HseText></HseText>
                        </View>
                        <View>
                            <HseText></HseText>
                        </View>
                        <View>
                            <HseText></HseText>
                        </View>
                    </Stack>
                </Stack>
            </ScrollView>
        </Stack>
    );
};
