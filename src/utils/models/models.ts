import { UserModel } from '../../models/UserModel/UserModel';
import { SQLUserRepository } from '../../repositories/UserRepository/SQLUserRepository/SQLUserRepository';
import { EventModel } from '../../models/EventsModel/EventsModel';
import { SQLEventsRepository } from '../../repositories/EventsRepository/SQLEventRespository/SQLEventRepository';

export const appUserModel = new UserModel(new SQLUserRepository());
export const appEventModel = new EventModel(new SQLEventsRepository());
