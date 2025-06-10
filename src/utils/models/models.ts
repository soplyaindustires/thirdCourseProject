import { UserModel } from '../../models/UserModel/UserModel';
import { MockUserRepository } from '../../repositories/UserRepository/MockUserRepository/mockUserRepository';
import { EventModel } from '../../models/EventsModel/EventsModel';
import { MockEventsRepository } from '../../repositories/EventsRepository/MockEventRespository/mockEventRepository';

export const appUserModel = new UserModel(new MockUserRepository());
export const appEventModel = new EventModel(new MockEventsRepository());
