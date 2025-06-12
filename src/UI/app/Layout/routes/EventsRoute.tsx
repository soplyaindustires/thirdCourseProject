import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { EventView } from '../../../screens/EventView/EventView';
import { EventInfo, EventInfoRouteParams } from '../../../screens/EventInfo/EventInfo';

export type EventStackParamList = {
    EventView: undefined;
    EventInfo: EventInfoRouteParams;
};

const EventsStack = createNativeStackNavigator<EventStackParamList>();

export const EventsRoute = () => {
    return (
        <EventsStack.Navigator screenOptions={{ headerShown: false }}>
            <EventsStack.Screen
                name="EventView"
                component={EventView}
            />
            <EventsStack.Screen
                name="EventInfo"
                component={EventInfo}
            />
        </EventsStack.Navigator>
    );
};
