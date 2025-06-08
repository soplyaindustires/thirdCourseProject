import { EventsRepository, HseEvent } from '../EventsRepository.interface';
import { mockEventsData } from '../MockEventRespository/mockEventData';

export class MockEventsRepository implements EventsRepository {
  private events = [...mockEventsData];

  // Вспомогательные методы
  private getEventOrThrow(id: number): HseEvent {
    const event = this.events.find(e => e.id === id);
    if (!event) throw new Error(`Событие с ID=${id} не найдено`);
    return event;
  }

  private getEventIndexOrThrow(id: number): number {
    const index = this.events.findIndex(e => e.id === id);
    if (index === -1) throw new Error(`Событие с ID=${id} не найдено`);
    return index;
  }

  // ==== Реализация интерфейса ==== //

  async getEventById(id: number): Promise<HseEvent> {
    return this.getEventOrThrow(id);
  }

  async getAllEvents(): Promise<HseEvent[]> {
    return [...this.events];
  }

  async createEvent(data: Omit<HseEvent, 'id'>): Promise<HseEvent> {
    const newEvent: HseEvent = {
      id: Date.now(),
      ...data
    };
    this.events.push(newEvent);
    return newEvent;
  }

  async updateEvent(data: HseEvent): Promise<HseEvent> {
    const index = this.getEventIndexOrThrow(data.id);
    this.events[index] = { ...data };
    return data;
  }

  async deleteEvent(id: number): Promise<void> {
    const index = this.getEventIndexOrThrow(id);
    this.events.splice(index, 1);
  }

  async joinEvent(userId: number, eventId: number): Promise<void> {
    const event = this.getEventOrThrow(eventId);
    if (!event.participants.includes(userId)) {
      event.participants.push(userId);
    }
  }

  async leaveEvent(userId: number, eventId: number): Promise<void> {
    const event = this.getEventOrThrow(eventId);
    event.participants = event.participants.filter(id => id !== userId);
  }
}