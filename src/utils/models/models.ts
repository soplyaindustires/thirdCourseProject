import { UserModel } from '../../models/UserModel/UserModel';
import { SQLEventsRepository } from '../../repositories/EventsRepository/SQLEventRepository/SQLEventsRepository';
import { EventModel } from '../../models/EventsModel/EventsModel';
import { SQLUserRepository } from '../../repositories/UserRepository/SQLUserRepository/SQLUserRepository';

export const appUserModel = new UserModel(new SQLUserRepository());
export const appEventModel = new EventModel(new SQLEventsRepository());
