import { reactive } from "vue";
import { userRepository } from "../repositories/user.repository";
import { IUser } from "../interfaces/user.interface";
import { IUserDto } from "../interfaces/user-dto.interface";

interface IState {
  user?: IUser;
  users: IUser[];
  readUser(): Promise<void>;
  getUsers(): void;
  createUser(userDto: IUserDto): Promise<IUser>;
  updateUser(id: string, user: Partial<IUser>): Promise<void>;
}

export const userService = reactive<IState>({
  users: [],

  async readUser(): Promise<void> {
    this.user = await userRepository.readUser();
  },

  getUsers(): void {
    userRepository.getUsers().then((users) => {
      this.users = users;
    });
  },

  createUser(userDto: IUserDto): Promise<IUser> {
    return userRepository.createUser(userDto);
  },

  updateUser(id: string, user: Partial<IUser>): Promise<void> {
    return userRepository.updateUser(id, user);
  },
});
