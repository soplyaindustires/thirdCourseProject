import { View, Text } from 'react-native';
import { EventViewStyle } from './EventView.styles';
import { Stack } from '../../designSystem/components/Stack/Stack';
import { EventList } from '../../widgets/EventList/EventList';
import { HseText } from '../../designSystem/components/HseText/HseText';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native';
import { paddingPalette } from '../../designSystem/constants.style';

export const EventView = () => {
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
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={EventViewStyle.listWrapper}
                >
                    <EventList />
                </ScrollView>
            </Stack>
        </SafeAreaView>
    );
};
