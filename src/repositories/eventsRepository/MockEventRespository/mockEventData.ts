import { HseEvent } from '../EventsRepository.interface';

export const mockEventsData: HseEvent[] = [
 {
    id: 101,
    title: 'Мастер-класс по UX/UI дизайну',
    description: 'Научитесь создавать удобные интерфейсы с нуля.',
    start: '2025-03-10T18:00:00Z',
    end: '2025-03-10T20:00:00Z',
    place: 'Кампус Костина, зал 207',
    creatorId: 2,
    participants: [1],
	 infoURL: "https://",        // ← добавлено
  	registrationURL: "https://" // ← добавлено
  },
  {
    id: 102,
    title: 'Хакатон по мобильной разработке',
    description: 'Создайте своё первое приложение за 48 часов!',
    start: '2025-04-01T09:00:00Z',
    end: '2025-04-03T18:00:00Z',
    place: 'Кампус Костина, зал 207',
    creatorId: 2,
    participants: [],
	 infoURL: "https://",         // ← добавлено
  registrationURL:"https://" // ← добавлено
  },
  {
    id: 103,
    title: 'Встреча с HR от крупных компаний',
    description: 'Обсудите карьерные возможности и пройдите мини-собеседования.',
    start: '2025-05-15T16:00:00Z',
    end: '2025-05-15T17:30:00Z',
    place: 'Кампус Костина, зал 207',
    creatorId: 2,
    participants: [1, 3],
	 infoURL: "https://",         // ← добавлено
  registrationURL: "https://" // ← добавлено
  },
]; //фейк данные


