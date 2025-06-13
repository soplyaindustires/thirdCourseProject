import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { EventView } from '../../../screens/EventView/EventView';
import { EventInfo, EventInfoRouteParams } from '../../../screens/EventInfo/EventInfo';
import { ProfileScreen } from '../../../screens/Profile/ProfileScreen';
import { EventCreation } from '../../../screens/EventCreation/EventCreation';
import { CreatedEventsScreen } from '../../../screens/CreatedEventsScreen/CreatedEventsScreen';

export type ProfileStackParamList = {
    ProfileScreen: undefined;
    CreateEvent: undefined;
    CreatedEvents: undefined;
    EventInfo: EventInfoRouteParams;
};

const stack = createNativeStackNavigator<ProfileStackParamList>();

export const ProfileRoute = () => {
    return (
        <stack.Navigator screenOptions={{ headerShown: false, animation: 'none' }}>
            <stack.Screen
                name="ProfileScreen"
                component={ProfileScreen}
            />
            <stack.Screen
                name="CreateEvent"
                component={EventCreation}
            />
            <stack.Screen
                name="CreatedEvents"
                component={CreatedEventsScreen}
            />
            <stack.Screen
                name="EventInfo"
                component={EventInfo}
            />
        </stack.Navigator>
    );
};
