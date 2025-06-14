import { Pressable, View } from 'react-native';
import { HseText } from '../../../designSystem/components/HseText/HseText';
import { Stack } from '../../../designSystem/components/Stack/Stack';
import { EventCreationStyle } from '../EventCreation.style';
import { useState } from 'react';
import RNDateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Feather, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

type DatePickerProps = {
    value: Date;
    onChange: (date?: Date) => void;
};

export const DatePicker = ({ value, onChange }: DatePickerProps) => {
    const [mode, setMode] = useState<'date' | 'time'>();
    const [isPickerVisible, setPickerVisible] = useState<boolean>();

    const onPress = (mode: 'date' | 'time') => {
        setMode(mode);
        setPickerVisible(true);
    };

    const onDateChange = (event?: DateTimePickerEvent, date?: Date) => {
        onChange(date);
        setPickerVisible(false);
    };

    return (
        <View style={{ width: '100%' }}>
            <Stack
                justify="flex-start"
                direction="row"
                gap="big"
                style={EventCreationStyle.timeContainer}
            >
                <Stack
                    direction="row"
                    gap="medium-big"
                >
                    <MaterialIcons
                        name="calendar-today"
                        size={20}
                    />
                    <Pressable onPress={() => onPress('date')}>
                        <HseText size={20}>
                            {value.toLocaleDateString('ru-RU', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                            })}
                        </HseText>
                    </Pressable>
                </Stack>
                <View style={EventCreationStyle.timeSplitter} />
                <Stack
                    direction="row"
                    justify="flex-start"
                    gap="big"
                >
                    <Feather
                        name="clock"
                        size={20}
                    />
                    <Pressable onPress={() => onPress('time')}>
                        <HseText size={20}>
                            {value.toLocaleTimeString('ru-RU', {
                                hour: '2-digit',
                                minute: '2-digit',
                            })}
                        </HseText>
                    </Pressable>
                </Stack>
            </Stack>
            {isPickerVisible && (
                <RNDateTimePicker
                    value={value}
                    mode={mode}
                    onChange={onDateChange}
                    locale="ru-RU"
                />
            )}
        </View>
    );
};
