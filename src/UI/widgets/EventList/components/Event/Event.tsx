import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { dummyEvents } from '../../dummyEvent';
import { EventStyle } from './Event.style';
import { Stack } from '../../../../designSystem/components/Stack/Stack';
import { typography } from '../../../../designSystem/constants.style';
import { getMonthNameByNumber } from '../../../../../utils/dateUtils/monthMapper';

import { openURL } from 'expo-linking';
import { HseText } from '../../../../designSystem/components/HseText/HseText';

type EventProps = {
    eventId: number;
};

export const Event = ({ eventId }: EventProps) => {
    /**
     * Заглушка
     */
    const data = dummyEvents.find(({ id }) => id === eventId);

    if (!data) {
        return null;
    }

    const start = new Date(data.start);

    return (
        <Stack
            direction="row"
            gap="big"
            padding="big"
            borderRadius="big"
            justify="flex-start"
            style={EventStyle.content}
        >
            <Stack
                borderRadius="medium-big"
                style={EventStyle.dateContainer}
                padding="small"
            >
                <HseText variant="title">{start.getDay()}</HseText>
                <HseText
                    size={16}
                    color="textSecondary"
                    numberOfLines={1}
                >
                    {getMonthNameByNumber(start.getMonth(), true)}
                </HseText>
            </Stack>
            <Stack
                gap="small"
                align="flex-start"
                style={{ flexShrink: 1 }}
            >
                <HseText
                    variant="title"
                    numberOfLines={3}
                >
                    {data.name}
                </HseText>
                <HseText
                    size={16}
                    color="textSecondary"
                >
                    {data.place}
                </HseText>
                <Pressable>
                    <HseText
                        size={16}
                        color="primary"
                        style={{ textDecorationLine: 'underline' }}
                    >
                        Подробнее
                    </HseText>
                </Pressable>
            </Stack>
        </Stack>
    );
};
