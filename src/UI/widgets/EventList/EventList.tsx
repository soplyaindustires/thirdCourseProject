import { Stack } from '../../designSystem/components/Stack/Stack';
import { dummyEvents } from './dummyEvent';
import { Event } from './components/Event/Event';
import { EventListStyle } from './EventList.style';

export const EventList = () => {
    return (
        <Stack
            style={EventListStyle.list}
            gap="medium"
            align="flex-start"
        >
            {dummyEvents.map(({ id }) => (
                <Event
                    key={id}
                    eventId={id}
                />
            ))}
        </Stack>
    );
};
