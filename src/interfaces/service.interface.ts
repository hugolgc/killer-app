import { ICompany } from "./company.interface";

export interface IService {
  id: number;
  name: string;
  company: ICompany;
}
