import { View, Text } from 'react-native';
import { EventViewStyle } from './EventView.styles';
import { Stack } from '../../designSystem/components/Stack/Stack';
import { EventList } from '../../widgets/EventList/EventList';
import { HseText } from '../../designSystem/components/HseText/HseText';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native';
import { colorPalette, paddingPalette } from '../../designSystem/constants.style';
import { appEventModel } from '../../../utils/models/models';
import { useEffect, useMemo, useState } from 'react';
import { HseEvent } from '../../../repositories/EventsRepository/EventsRepository.interface';
import { HseButton } from '../../designSystem/components/HseButton/HseButton';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { StartDatePicker } from './components/StartDatePicker';
import { useAuth } from '../../app/Auth/AuthContext/AuthContext';

export const EventView = () => {
    const { user } = useAuth();

    const [data, setData] = useState<HseEvent[]>([]);
    const [isError, setIsError] = useState<boolean>(false);

    const [onlyRegistered, setOnlyRegistered] = useState<boolean>(false);
    const [sorted, setSorted] = useState<boolean>(false);

    const [startDate, setStartDate] = useState<Date>(new Date(`2025-01-01T00:00:00Z`));

    const onDateChange = (date?: Date) => {
        const n = date || startDate;
        console.log(date);
        setStartDate(n);
    };

    const onSortPress = () => {
        setSorted(prev => !prev);
    };

    const onRegPress = () => {
        if (!user) {
            return;
        }

        setOnlyRegistered(prev => !prev);
    };

    const dataToDisplay = useMemo(() => {
        if (!data) {
            return [];
        }

        const filteredData = data.filter(value => {
            let reg = true;

            if (onlyRegistered && user) {
                reg = value.participants.includes(user.id);
            }

            return reg && new Date(value.start).getTime() > startDate.getTime();
        });

        filteredData.sort((a, b) => {
            const left = new Date(a.start).getTime();
            const right = new Date(b.start).getTime();

            if (sorted) {
                return right - left;
            }

            return left - right;
        });

        return filteredData;
    }, [sorted, data, onlyRegistered, startDate]);

    useEffect(() => {
        const request = async () => {
            try {
                const response = await appEventModel.getAllEvents();
                setData(response);
            } catch (e) {
                setIsError(true);
            }
        };

        request();
    });

    if (!data) {
        return (
            <SafeAreaView>
                <HseText>Loading</HseText>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView>
            <Stack
                justify="flex-start"
                align="flex-start"
                style={EventViewStyle.screen}
                padding="big"
                gap="big"
            >
                <HseText
                    variant="title"
                    size={24}
                    style={{ paddingLeft: paddingPalette.big }}
                >
                    События
                </HseText>
                <Stack
                    direction="row"
                    justify="space-between"
                    maxWidth
                >
                    <HseButton
                        color={onlyRegistered ? 'blue' : 'transparent'}
                        onPress={onRegPress}
                    >
                        <MaterialIcons
                            name="event-available"
                            color={onlyRegistered ? colorPalette.backgroundPrimary : colorPalette.textPrimary}
                            size={24}
                        />
                    </HseButton>
                    <StartDatePicker
                        value={startDate}
                        onChange={onDateChange}
                    />
                    <HseButton
                        color="transparent"
                        onPress={onSortPress}
                    >
                        <MaterialCommunityIcons
                            name={sorted ? 'arrow-up' : 'arrow-down'}
                            size={24}
                        />
                    </HseButton>
                </Stack>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={EventViewStyle.listWrapper}
                >
                    <EventList data={dataToDisplay} />
                </ScrollView>
            </Stack>
        </SafeAreaView>
    );
};
