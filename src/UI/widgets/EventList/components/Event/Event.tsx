import { Pressable } from 'react-native';
import { dummyEvents } from '../../dummyEvent';
import { EventStyle } from './Event.style';
import { Stack } from '../../../../designSystem/components/Stack/Stack';
import { getMonthNameByNumber } from '../../../../../utils/dateUtils/monthMapper';

import { openURL } from 'expo-linking';
import { HseText } from '../../../../designSystem/components/HseText/HseText';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { EventStackParamList } from '../../../../app/Layout/routes/EventsRoute';
import { HseEvent } from '../../../../../repositories/EventsRepository/EventsRepository.interface';

type EventProps = {
    data: HseEvent;
};

export const Event = ({ data }: EventProps) => {
    const navigation = useNavigation<NativeStackScreenProps<EventStackParamList>['navigation']>();

    if (!data) {
        return null;
    }

    const start = new Date(data.start);

    const onTitlePress = () => {
        navigation.navigate('EventInfo', { eventId: data.id });
    };

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
                <Pressable onPress={onTitlePress}>
                    <HseText
                        variant="title"
                        numberOfLines={3}
                    >
                        {data.title}
                    </HseText>
                </Pressable>
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
