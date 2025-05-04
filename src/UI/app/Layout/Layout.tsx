import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import CustomTabBar from './components/CustomTabBar';
import { EventView } from '../../screens/EventView/EventView';

const Tab = createBottomTabNavigator();

export const Layout = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator tabBar={props => <CustomTabBar {...props} />}>
                <Tab.Screen
                    name="Home"
                    component={EventView}
                    options={{ title: 'Abdul', headerShown: true }}
                />
                <Tab.Screen
                    name="Profile"
                    component={() => <View></View>}
                    options={{ title: 'Profile', headerShown: true }}
                />
                <Tab.Screen
                    name="Settings"
                    component={() => <View></View>}
                    options={{ title: 'Settings', headerShown: true }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
};
