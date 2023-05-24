import { IObjective } from "./objective.interface";
import { IUser } from "./user.interface";

export interface IMission {
  id: number;
  start: string;
  end: string;
  completed: string | null;
  objective: IObjective;
  current_user: IUser;
  target_user: IUser;
}
