import { IObjective } from "./objective.interface";
import { IPlace } from "./place.interface";
import { IService } from "./service.interface";
import { IUser } from "./user.interface";

export interface ICompany {
  id: number;
  status: boolean;
  name: string;
  logo: string;
  places: IPlace[];
  services: IService[];
  objectives: IObjective[];
  users: IUser[];
}
