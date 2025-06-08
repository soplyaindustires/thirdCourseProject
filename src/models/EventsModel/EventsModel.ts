import {EventsRepository, HseEvent} from '../../repositories/EventsRepository/EventsRepository.interface';

export class EventModel {
  private repository: EventsRepository;

  constructor(repository: EventsRepository) {
    this.repository = repository;
  }

  /**
   * Получить событие по ID
   */
  async getEventById(id: number): Promise<HseEvent> {
    return await this.repository.getEventById(id);
  }

  /**
   * Получить список всех событий
   */
  async getAllEvents(): Promise<HseEvent[]> {
    return await this.repository.getAllEvents();
  }

  /**
   * Создать новое событие
   */
  async createEvent(data: Omit<HseEvent, 'id'>): Promise<HseEvent> {
    return await this.repository.createEvent(data);
  }

  /**
   * Обновить существующее событие
   */
  async updateEvent(data: HseEvent): Promise<HseEvent> {
    return await this.repository.updateEvent(data);
  }

  /**
   * Удалить событие по ID
   */
  async deleteEvent(id: number): Promise<void> {
    await this.repository.deleteEvent(id);
  }

  /**
   * Пользователь записывается на событие
   */
  async joinEvent(userId: number, eventId: number): Promise<void> {
    await this.repository.joinEvent(userId, eventId);
  }

  /**
   * Пользователь отписывается от события
   */
  async leaveEvent(userId: number, eventId: number): Promise<void> {
    await this.repository.leaveEvent(userId, eventId);
  }
}

