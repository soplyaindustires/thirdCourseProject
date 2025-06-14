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

 async createEvent(data: Omit<HseEvent, 'id'>): Promise<HseEvent> {
    this.validateUrls(data.infoURL, data.registrationURL);
    return await this.repository.createEvent(data);
  }

  async updateEvent(data: HseEvent): Promise<HseEvent> {
    this.validateUrls(data.infoURL, data.registrationURL);
    return await this.repository.updateEvent(data);
  }

  // Проверка ссылок
  private validateUrls(...urls: (string | null)[]): void {
    for (const url of urls) {
      if (url === null) continue;

      try {
        new URL(url); // если не бросится ошибка → значит, это валидный URL
      } catch (e) {
        throw new Error(`Некорректный URL: ${url}`);
      }
    }
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


async getEventsByCreator(creatorId: number): Promise<HseEvent[]> {
  return await this.repository.getEventsByCreator(creatorId);
}
}

