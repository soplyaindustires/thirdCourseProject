import { User } from '../UserRepository.interface';

export const mockUsersData: User[] = [
    {
        id: 1,
        login: 'np@edu.hse.ru',
        password: '123',
        role: 'user',
        registeredEvents: [101],
        createdEvents: [],
        createdDate: '2025-01-15T09:30:00Z',
    },
    {
        id: 2,
        login: 'creator@hse.ru',
        password: 'creator123',
        role: 'creator',
        registeredEvents: [102],
        createdEvents: [103],
        createdDate: '2024-12-01T12:00:00Z',
    },
    {
        id: 3,
        login: 'admin',
        password: '123',
        role: 'creator',
        registeredEvents: [],
        createdEvents: [],
        createdDate: '2024-12-01T12:00:00Z',
    },
];
