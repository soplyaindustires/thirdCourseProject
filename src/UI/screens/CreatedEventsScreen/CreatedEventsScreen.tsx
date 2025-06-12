import { View, Text } from 'react-native';
import { CreatedEventsScreenStyle } from './CreatedEventsScreen.styles';
import { Stack } from '../../designSystem/components/Stack/Stack';
import { EventList } from '../../widgets/EventList/EventList';
import { HseText } from '../../designSystem/components/HseText/HseText';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native';
import { paddingPalette } from '../../designSystem/constants.style';
import { appEventModel } from '../../../utils/models/models';
import { useEffect, useState } from 'react';
import { HseEvent } from '../../../repositories/EventsRepository/EventsRepository.interface';
import { useAuth } from '../../app/Auth/AuthContext/AuthContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ProfileStackParamList } from '../../app/Layout/routes/ProfileRoute';
import { GoBackButton } from '../../designSystem/components/GoBackButton/GoBackButton';

type CreatedEventsScreenProps = NativeStackScreenProps<ProfileStackParamList, 'CreatedEvents'>;

export const CreatedEventsScreen = ({ navigation }: CreatedEventsScreenProps) => {
    const { user } = useAuth();

    if (!user) {
        throw new Error('aaaaaaaaaaa');
    }

    const [data, setData] = useState<HseEvent[]>();
    const [isError, setIsError] = useState<boolean>(false);

    useEffect(() => {
        const request = async () => {
            try {
                const response = await appEventModel
                    .getAllEvents()
                    .then(data => data.filter(({ creatorId }) => creatorId === user.id));
                setData(response);
            } catch (e) {
                setIsError(true);
            }
        };

        request();
    });

    const onGoBackPress = () => {
        navigation.goBack();
    };

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
                style={CreatedEventsScreenStyle.screen}
                padding="big"
                gap="big"
            >
                <Stack
                    direction="row"
                    justify="flex-start"
                    gap="big"
                >
                    <GoBackButton onPress={onGoBackPress} />
                    <HseText
                        variant="title"
                        size={24}
                        style={{ paddingLeft: paddingPalette.big }}
                    >
                        Созданные события
                    </HseText>
                </Stack>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={CreatedEventsScreenStyle.listWrapper}
                >
                    <EventList data={data} />
                </ScrollView>
            </Stack>
        </SafeAreaView>
    );
};
