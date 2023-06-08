import { environment } from "../environments";
import { notificationService } from "../services/notification.service";
import { userFactory } from "../factories/user.factory";
import { dataHelper } from "../helpers/data.helper";
import { IPlace } from "../interfaces/place.interface";
import { IUser } from "../interfaces/user.interface";
import { IUserDto } from "../interfaces/user-dto.interface";

const api = environment.api();

export const userRepository = {
  async readUser(): Promise<IUser> {
    try {
      const user = await api.users.me.read(userFactory.readUser());
      return dataHelper.to<IUser>(user);
    } catch (e) {
      notificationService.throw(e, "Une erreur est survenue");
      throw new Error();
    }
  },

  async getUsers(): Promise<IUser[]> {
    try {
      const users = await api.users.readByQuery(userFactory.getUsers());
      return dataHelper.to<IUser[]>(users.data);
    } catch (e) {
      notificationService.throw(e, "Une erreur est survenue");
      throw new Error();
    }
  },

  async getActiveUsersFromPlace(place: IPlace): Promise<IUser[]> {
    try {
      const users = await api.users.readByQuery(
        // @ts-ignore
        userFactory.getActiveUsersFromPlace(place)
      );
      return dataHelper.to<IUser[]>(users.data);
    } catch (e) {
      notificationService.throw(e, "Une erreur est survenue");
      throw new Error();
    }
  },

  async createUser(userDto: IUserDto): Promise<IUser> {
    try {
      const user = await api.users.createOne(userDto);
      return dataHelper.to<IUser>(user);
    } catch (e) {
      throw new Error();
    }
  },

  async updateUser(id: string, user: Partial<IUser>): Promise<void> {
    try {
      await api.users.updateOne(id, user);
    } catch (e) {
      notificationService.throw(e, "Une erreur est survenue");
      throw new Error();
    }
  },
};
