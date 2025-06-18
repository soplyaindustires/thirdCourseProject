import { EventsRepository, HseEvent } from '../EventsRepository.interface';
import { ApiClient } from '../../../utils/apiClient/apiClient';

/**
 * Репозиторий событий, взаимодействующий с сервером через API
 */
export class SQLEventsRepository implements EventsRepository {
    private apiClient: ApiClient;

    /**
     * Создает экземпляр SQLEventRepository
     */
    constructor() {
        this.apiClient = new ApiClient('http://localhost:3000/api/events');
    }

    /**
     * Получает событие по ID
     * @param id - ID события
     * @returns Промис с данными события
     * @throws Ошибка, если событие не найдено
     */
    async getEventById(id: number): Promise<HseEvent> {
        return this.apiClient.get<HseEvent>(`/${id}`);
    }

    /**
     * Получает все события
     * @returns Промис с массивом всех событий
     */
    async getAllEvents(): Promise<HseEvent[]> {
        return this.apiClient.get<HseEvent[]>('/');
    }

    /**
     * Создает новое событие
     * @param data - Данные события без id
     * @returns Промис с данными созданного события
     * @throws Ошибка, если создатель события не найден
     */
    async createEvent(data: Omit<HseEvent, 'id'>): Promise<HseEvent> {
        return this.apiClient.post<HseEvent>('/', data);
    }

    /**
     * Обновляет данные события
     * @param id - ID события
     * @param data - Частичные данные события для обновления
     * @returns Промис с обновленными данными события
     * @throws Ошибка, если событие или создатель не найдены
     */
    async updateEvent(id: number, data: Partial<Omit<HseEvent, 'id'>>): Promise<HseEvent> {
        return this.apiClient.put<HseEvent>(`/${id}`, data);
    }

    /**
     * Удаляет событие
     * @param id - ID события
     * @returns Промис, завершающийся после удаления
     * @throws Ошибка, если событие не найдено
     */
    async deleteEvent(id: number): Promise<void> {
        const response = await fetch(`http://localhost:3000/api/events/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`Ошибка ${response.status}: ${await response.text()}`);
        }
    }

    /**
     * Записывает пользователя на событие
     * @param userId - ID пользователя
     * @param eventId - ID события
     * @returns Промис, завершающийся после записи
     * @throws Ошибка, если пользователь или событие не найдены, или пользователь уже записан
     */
    async joinEvent(userId: number, eventId: number): Promise<void> {
        await this.apiClient.post<void>('/join', { userId, eventId });
    }

    /**
     * Отписывает пользователя от события
     * @param userId - ID пользователя
     * @param eventId - ID события
     * @returns Промис, завершающийся после отписки
     * @throws Ошибка, если пользователь или событие не найдены
     */
    async leaveEvent(userId: number, eventId: number): Promise<void> {
        await this.apiClient.post<void>('/leave', { userId, eventId });
    }

    /**
     * Получает события, созданные определенным пользователем
     * @param creatorId - ID создателя событий
     * @returns Промис с массивом событий
     */
    async getEventsByCreator(creatorId: number): Promise<HseEvent[]> {
        return this.apiClient.get<HseEvent[]>(`/creator/${creatorId}`);
    }
}
