import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomTabBar from './components/CustomTabBar';
import { ProfileScreen } from '../../screens/Profile/ProfileScreen';
import { EventsRoute } from './routes/EventsRoute';
import { ProfileRoute } from './routes/ProfileRoute';

const Tabs = createBottomTabNavigator();

export const Layout = () => {
    return (
        <Tabs.Navigator tabBar={props => <CustomTabBar {...props} />}>
            <Tabs.Screen
                name="Home"
                component={EventsRoute}
                options={{ headerShown: false }}
            />
            <Tabs.Screen
                name="Profile"
                component={ProfileRoute}
                options={{ headerShown: false }}
            />
        </Tabs.Navigator>
    );
};
