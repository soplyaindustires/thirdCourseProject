import { useState } from 'react';
import { Stack } from '../../../designSystem/components/Stack/Stack';
import { Platform, Pressable, StyleSheet, View } from 'react-native';
import { colorPalette, paddingPalette } from '../../../designSystem/constants.style';
import { HseText } from '../../../designSystem/components/HseText/HseText';
import RNDateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { getMonthNameByNumber } from '../../../../utils/dateUtils/monthMapper';

type StartDatePickerProps = {
    value: Date;
    onChange: (date?: Date) => void;
};

export const StartDatePicker = ({ value, onChange }: StartDatePickerProps) => {
    const [visible, setVisible] = useState<boolean>(false);

    const onPress = () => {
        setVisible(true);
    };

    return (
        <View>
            <Pressable onPress={onPress}>
                <Stack
                    direction="row"
                    borderRadius="medium-big"
                    justify="flex-start"
                    gap="medium"
                    style={style.container}
                >
                    <HseText
                        size={24}
                        color="textSecondary"
                    >
                        С
                    </HseText>
                    <HseText
                        size={24}
                        color="textSecondary"
                    >
                        {getMonthNameByNumber(value.getMonth(), true)}
                    </HseText>
                    <HseText
                        size={24}
                        color="textSecondary"
                    >
                        {value.toLocaleString('ru-RU', { year: 'numeric' })}
                    </HseText>
                </Stack>
            </Pressable>
            {visible && (
                <RNDateTimePicker
                    // design="material"
                    value={value}
                    onChange={(e, date) => {
                        console.log('aaaaa');
                        onChange(date);
                        setVisible(Platform.OS === 'ios');
                    }}
                    locale="ru-RU"
                    mode="date"
                />
            )}
        </View>
    );
};

const style = StyleSheet.create({
    container: {
        paddingTop: paddingPalette.medium,
        paddingBottom: paddingPalette.medium,
        paddingLeft: paddingPalette.large,
        paddingRight: paddingPalette.large,
        borderColor: colorPalette.backgroundAccent,
        borderWidth: 1,
    },
    delimiter: {
        width: 1,
        height: '100%',
        backgroundColor: colorPalette.backgroundAccent,
    },
});
