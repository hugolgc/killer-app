import { reactive } from "vue";
import { userRepository } from "../repositories/user.repository";
import { IUser } from "../interfaces/user.interface";

interface IState {
  user?: IUser;
  users: IUser[];
  read(): Promise<void>;
  getUsers(): void;
}

export const userService = reactive<IState>({
  users: [],

  async read(): Promise<void> {
    this.user = await userRepository.read();
  },

  getUsers(): void {
    userRepository.getUsers().then((users) => {
      this.users = users;
      console.table(this.users);
    });
  },
});
