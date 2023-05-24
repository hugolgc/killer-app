import { ICompany } from "./company.interface";
import { IMission } from "./mission.interface";
import { IPlace } from "./place.interface";
import { IService } from "./service.interface";

export interface IUser {
  id: string;
  first_name: string;
  last_name: string;
  avatar: string;
  email: string;
  password: string;
  points: number;
  company: ICompany;
  place: IPlace;
  service: IService;
  missions: IMission[];
}
