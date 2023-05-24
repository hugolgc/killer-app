import { TObjective } from "../types/objective.type";
import { ICompany } from "./company.interface";

export interface IObjective {
  id: number;
  value: string;
  type: TObjective;
  points: number;
  company: ICompany;
}
