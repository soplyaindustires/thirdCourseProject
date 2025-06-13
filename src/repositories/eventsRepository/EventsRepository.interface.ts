export type HseEvent = {
    id: number;
    title: string; // Название события
    description: string; // Описание
    start: string; // Дата начала
    end: string;   // Дата окончания
    place: string; // Место проведения
    creatorId: number; // Кто создал событие (ID пользователя)
    participants: number[]; // Участники (ID пользователей)
	infoURL: string | null;          // ← добавлено
  	registrationURL: string | null;  // ← добавлено
};

export interface EventsRepository {
    /**
     * Получить событие по ID
     * @param id - Уникальный идентификатор события
     */
    getEventById(id: number): Promise<HseEvent>;

    /**
     * Получить список всех событий
     */
    getAllEvents(): Promise<HseEvent[]>;

     /**
   	* Создать новое событие
   	*/
    createEvent(data: Omit<HseEvent, 'id'>): Promise<HseEvent>;

   /**
   * Обновить существующее событие
   */
    updateEvent(data: HseEvent): Promise<HseEvent>;

    /**
     * Удалить событие по ID (создатель удаляет созданное им событие)
     * @param id - ID события
     */
    deleteEvent(id: number): Promise<void>;

    /**
     * Пользователь записывается на событие
     * @param userId - ID пользователя
     * @param eventId - ID события
     */
    joinEvent(userId: number, eventId: number): Promise<void>;

    /**
     * Пользователь отписывается от события
     * @param userId - ID пользователя
     * @param eventId - ID события
     */
    leaveEvent(userId: number, eventId: number): Promise<void>;
}
