import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { EventInfo } from './types';
import { EventStyle } from './Event.style';

interface EventProps {
    data: EventInfo;
}

export const Event = ({ data }: EventProps) => {
    return (
        <View style={EventStyle.container}>
            <Text style={EventStyle.title}>{data.title}</Text>
            <Text style={EventStyle.date}>{data.date}</Text>
            <Text style={EventStyle.location}>{data.location}</Text>
        </View>
    );
};
