import { useRef, useState } from 'react';
import RNDateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Stack } from '../../designSystem/components/Stack/Stack';
import { Pressable, ScrollView, TextInput, View } from 'react-native';
import { HseText } from '../../designSystem/components/HseText/HseText';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ProfileStackParamList } from '../../app/Layout/routes/ProfileRoute';
import { GoBackButton } from '../../designSystem/components/GoBackButton/GoBackButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import { EventCreationStyle } from './EventCreation.style';
import { colorPalette } from '../../designSystem/constants.style';
import Modal from 'react-native-modal';
import { HseButton } from '../../designSystem/components/HseButton/HseButton';
import { appEventModel } from '../../../utils/models/models';
import { useAuth } from '../../app/Auth/AuthContext/AuthContext';

type EventCreationScreenProps = NativeStackScreenProps<ProfileStackParamList, 'CreateEvent'>;
type Modes = 'date' | 'time';

export const EventCreation = ({ navigation }: EventCreationScreenProps) => {
    const { user } = useAuth();

    const [name, setName] = useState<string>();
    const [description, setDescription] = useState<string>();

    const [place, setPlace] = useState<string>();
    const [startDate, setStartDate] = useState<Date>(new Date(Date.now()));
    const [endDate, setEndDate] = useState<Date>(new Date(Date.now() + 1000 * 60 * 60));

    const [isPickerVisible, setPickerVisible] = useState<boolean>(false);
    const [mode, setMode] = useState<Modes>('date');
    const [pickForStart, setPickForStart] = useState<boolean>(true);

    const [infoURL, setInfoURL] = useState<string>();
    const [registrationURL, setRegistrationURL] = useState<string>();

    const onGoBackPress = () => {
        navigation.navigate('ProfileScreen');
    };

    const showPicker = (pickerMode: Modes) => {
        setMode(pickerMode);
        setPickerVisible(true);
    };

    const pickStart = (pickerMode: Modes) => {
        setPickForStart(true);
        showPicker(pickerMode);
    };

    const pickEnd = (pickerMode: Modes) => {
        console.log('picking end');
        setPickForStart(false);
        showPicker(pickerMode);
    };

    const onDateChange = (event?: DateTimePickerEvent, date?: Date) => {
        let normalizedDate;
        if (pickForStart) {
            normalizedDate = date || startDate;
            setStartDate(normalizedDate);
            if (normalizedDate.getTime() > endDate.getTime()) {
                setEndDate(new Date(normalizedDate.getTime() + 1000 * 60 * 60));
            }
        } else {
            normalizedDate = date || endDate;
            setEndDate(normalizedDate);
        }

        setPickerVisible(false);
    };

    const onCreatePress = () => {
        if (!name || !description || !place || !infoURL || !registrationURL || !user) {
            console.log('aaaa');
            return;
        }

        appEventModel.createEvent({
            title: name,
            description: description,
            place: place,
            start: startDate.toISOString(),
            end: endDate.toISOString(),
            participants: [],
            creatorId: user.id,
        });
    };

    return (
        <SafeAreaView
            style={{ display: 'flex', height: '100%', width: '100%', backgroundColor: colorPalette.backgroundPrimary }}
        >
            <Stack
                padding="big"
                align="flex-start"
                justify="flex-start"
                gap="medium-big"
            >
                <Stack
                    direction="row"
                    justify="flex-start"
                    gap="big"
                >
                    <GoBackButton onPress={onGoBackPress} />
                    <HseText variant="title">Создание события</HseText>
                </Stack>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{ display: 'flex', height: '100%', width: '100%' }}
                >
                    <Stack
                        align="flex-start"
                        gap="medium-big"
                        maxWidth
                    >
                        <TextInput
                            style={EventCreationStyle.input}
                            value={name}
                            placeholder="Название"
                            onChangeText={setName}
                        />
                        <TextInput
                            multiline
                            textAlignVertical="top"
                            numberOfLines={15}
                            style={[EventCreationStyle.input, { minHeight: 160 }]}
                            value={description}
                            placeholder="Описание..."
                            onChangeText={setDescription}
                        />
                        <TextInput
                            style={EventCreationStyle.input}
                            value={place}
                            placeholder="Место проведения"
                            onChangeText={setPlace}
                        />
                        {/* НАЧАЛО СОБЫТИЯ */}
                        <Stack
                            justify="flex-start"
                            align="flex-start"
                            gap="medium"
                        >
                            <HseText
                                variant="title"
                                color="textSecondary"
                            >
                                Начало:
                            </HseText>
                            <Stack
                                justify="space-between"
                                direction="row"
                                gap="big"
                                style={EventCreationStyle.timeContainer}
                            >
                                <Stack direction="row">
                                    <Pressable onPress={() => pickStart('date')}>
                                        <HseText size={16}>
                                            {startDate.toLocaleDateString('ru-RU', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric',
                                            })}
                                        </HseText>
                                    </Pressable>
                                </Stack>
                                <View style={EventCreationStyle.timeSplitter} />
                                <Stack direction="row">
                                    <Pressable onPress={() => pickStart('time')}>
                                        <HseText size={16}>
                                            {startDate.toLocaleTimeString('ru-RU', {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}
                                        </HseText>
                                    </Pressable>
                                </Stack>
                            </Stack>
                        </Stack>
                        {/* КОНЕЦ СОБЫТИЯ */}
                        <Stack
                            justify="flex-start"
                            align="flex-start"
                            gap="medium"
                        >
                            <HseText
                                variant="title"
                                color="textSecondary"
                            >
                                Конец:
                            </HseText>
                            <Stack
                                justify="space-between"
                                direction="row"
                                gap="big"
                                style={EventCreationStyle.timeContainer}
                            >
                                <Stack direction="row">
                                    <Pressable onPress={() => pickEnd('date')}>
                                        <HseText size={16}>
                                            {endDate.toLocaleDateString('ru-RU', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric',
                                            })}
                                        </HseText>
                                    </Pressable>
                                </Stack>
                                <View style={EventCreationStyle.timeSplitter} />
                                <Stack direction="row">
                                    <Pressable onPress={() => pickEnd('time')}>
                                        <HseText size={16}>
                                            {endDate.toLocaleTimeString('ru-RU', {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}
                                        </HseText>
                                    </Pressable>
                                </Stack>
                            </Stack>
                        </Stack>
                        {/* КОНЕЦ ВЫБОРА ВРЕМЕНИ */}
                        <TextInput
                            style={EventCreationStyle.input}
                            value={infoURL}
                            placeholder="Ссылка на сайт события"
                            onChangeText={setInfoURL}
                        />
                        <TextInput
                            style={EventCreationStyle.input}
                            value={registrationURL}
                            placeholder="Ссылка на страницу регистрации"
                            onChangeText={setRegistrationURL}
                        />
                        <HseButton
                            color="blue"
                            width={'100%'}
                            onPress={onCreatePress}
                        >
                            <HseText color="backgroundPrimary">Создать</HseText>
                        </HseButton>
                    </Stack>
                </ScrollView>
            </Stack>

            {isPickerVisible && (
                <RNDateTimePicker
                    value={pickForStart ? startDate : endDate}
                    mode={mode}
                    // display={Platform.OS === 'ios' ? 'inline' : 'default'}
                    onChange={onDateChange}
                    locale="ru-RU"
                />
            )}
        </SafeAreaView>
    );
};
