import React from 'react';
import { View, Platform, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { customTabBarStyle } from './CustomTabBar.style';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const inactiveIconNames: Record<string, string> = {
    Home: 'home',
    Profile: 'person',
    Settings: 'settings',
};

const activeIconNames = Object.fromEntries(
    Object.entries(inactiveIconNames).map(([key, value]) => {
        return [key, `${value}-outline`];
    })
);

/**
 * Кастомный компонент навигационной панели, переопределяющий дефолтный компонент
 * BottomTabNavigator'а
 * @todo сделать SVG-иконки с анимациями
 * @returns
 */
const CustomTabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
    const insets = useSafeAreaInsets();

    const paddingBottomSafe = {
        paddingBottom: Platform.OS === 'ios' ? insets.bottom : insets.bottom + 10,
    };

    return (
        <View style={[customTabBarStyle.tabBar, paddingBottomSafe]}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const isFocused = state.index === index;

                const iconName = isFocused
                    ? inactiveIconNames[route.name] || 'circle'
                    : activeIconNames[route.name] || 'circle-outline';

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                return (
                    <Pressable
                        key={route.key}
                        testID={options.tabBarButtonTestID}
                        onPress={onPress}
                        style={customTabBarStyle.tab}
                    >
                        <View style={customTabBarStyle.iconContainer}>
                            <Ionicons
                                // @ts-ignore
                                name={iconName}
                                size={24}
                                color={isFocused ? '#007AFF' : '#888'}
                            />
                        </View>
                    </Pressable>
                );
            })}
        </View>
    );
};

export default CustomTabBar;
