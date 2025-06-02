import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { EventInfo } from './types';
import { EventStyle } from './Event.style';

type EventProps = {
    eventId: number;
};

export const Event = ({ eventId }: EventProps) => {
    return <View style={EventStyle.container}></View>;
};
