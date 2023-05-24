import { ICompany } from "./company.interface";

export interface IPlace {
  id: number;
  name: string;
  company: ICompany;
}
