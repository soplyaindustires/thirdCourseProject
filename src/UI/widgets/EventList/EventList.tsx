import { Stack } from '../../designSystem/components/Stack/Stack';
import { dummyEvents } from './dummyEvent';
import { Event } from './components/Event/Event';
import { EventListStyle } from './EventList.style';
import { HseEvent } from '../../../repositories/EventsRepository/EventsRepository.interface';

type EventListProps = {
    data: HseEvent[];
};

export const EventList = ({ data }: EventListProps) => {
    return (
        <Stack
            style={EventListStyle.list}
            gap="medium"
            align="flex-start"
        >
            {data.map(data => (
                <Event
                    key={data.id}
                    data={data}
                />
            ))}
        </Stack>
    );
};
