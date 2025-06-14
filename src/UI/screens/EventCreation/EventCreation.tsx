import { useState } from 'react';
import { Stack } from '../../designSystem/components/Stack/Stack';
import { ScrollView, TextInput } from 'react-native';
import { HseText } from '../../designSystem/components/HseText/HseText';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ProfileStackParamList } from '../../app/Layout/routes/ProfileRoute';
import { GoBackButton } from '../../designSystem/components/GoBackButton/GoBackButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import { EventCreationStyle } from './EventCreation.style';
import { colorPalette } from '../../designSystem/constants.style';
import { HseButton } from '../../designSystem/components/HseButton/HseButton';
import { appEventModel } from '../../../utils/models/models';
import { useAuth } from '../../app/Auth/AuthContext/AuthContext';
import { DatePicker } from './components/DatePicker';
import Toast from 'react-native-toast-message';

type EventCreationScreenProps = NativeStackScreenProps<ProfileStackParamList, 'CreateEvent'>;

export const EventCreation = ({ navigation }: EventCreationScreenProps) => {
    const { user } = useAuth();

    const [name, setName] = useState<string>();
    const [description, setDescription] = useState<string>();

    const [place, setPlace] = useState<string>();
    const [startDate, setStartDate] = useState<Date>(new Date(Date.now()));
    const [endDate, setEndDate] = useState<Date>(new Date(Date.now() + 1000 * 60 * 60));

    const [infoURL, setInfoURL] = useState<string>();
    const [registrationURL, setRegistrationURL] = useState<string>();

    const onGoBackPress = () => {
        navigation.navigate('ProfileScreen');
    };

    const onStartDateChange = (date?: Date) => {
        const normalizedDate = date || startDate;

        setStartDate(normalizedDate);

        if (normalizedDate.getTime() > endDate.getTime()) {
            setEndDate(new Date(normalizedDate.getTime() + 1000 * 60 * 60));
        }
    };

    const onEndDateChange = (date?: Date) => {
        const normalizedDate = date || endDate;

        setEndDate(normalizedDate);
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
            infoURL: infoURL,
            registrationURL: registrationURL,
        });

        navigation.goBack();
        Toast.show({
            type: 'tomatoToast',
            text1: `Событие ${name} создано!`,
        });
        setTimeout(() => {
            Toast.hide();
        }, 2000);
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
                            maxWidth
                        >
                            <HseText
                                variant="title"
                                color="textSecondary"
                            >
                                Начало
                            </HseText>
                            <DatePicker
                                value={startDate}
                                onChange={onStartDateChange}
                            />
                        </Stack>
                        {/* КОНЕЦ СОБЫТИЯ */}
                        <Stack
                            maxWidth
                            justify="flex-start"
                            align="flex-start"
                            gap="medium"
                        >
                            <HseText
                                variant="title"
                                color="textSecondary"
                            >
                                Конец
                            </HseText>
                            <DatePicker
                                value={endDate}
                                onChange={onEndDateChange}
                            />
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
        </SafeAreaView>
    );
};
