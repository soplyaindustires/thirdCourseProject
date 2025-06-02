import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import CustomTabBar from './components/CustomTabBar';
import { EventView } from '../../screens/EventView/EventView';
import { ProfileScreen } from '../../screens/Profile/ProfileScreen';

const Tabs = createBottomTabNavigator();

export const Layout = () => {
    return (
        <Tabs.Navigator tabBar={props => <CustomTabBar {...props} />}>
            <Tabs.Screen
                name="Home"
                component={EventView}
                options={{ title: 'Abdul', headerShown: true }}
            />
            <Tabs.Screen
                name="Profile"
                component={ProfileScreen}
                options={{ title: 'Profile', headerShown: true }}
            />
            <Tabs.Screen
                name="Settings"
                component={() => <View></View>}
                options={{ title: 'Settings', headerShown: true }}
            />
        </Tabs.Navigator>
    );
};
