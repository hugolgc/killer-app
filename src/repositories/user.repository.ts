import { environment } from "../environments";
import { userFactory } from "../factories/user.factory";
import { dataHelper } from "../helpers/data.helper";
import { IUser } from "../interfaces/user.interface";

const api = environment.api();

export const userRepository = {
  async read(): Promise<IUser> {
    try {
      const user = await api.users.me.read(userFactory.read());
      return dataHelper.to<IUser>(user);
    } catch {
      throw new Error();
    }
  },

  async getUsers(): Promise<IUser[]> {
    try {
      const users = await api.users.readByQuery(userFactory.getUsers());
      return dataHelper.to<IUser[]>(users.data);
    } catch (e) {
      console.warn(e);
      throw new Error();
    }
  },
};
