import { ICompany } from "./company.interface";
import { IReactive } from "./reactive.interface";

export interface IService extends IReactive {
  id: number;
  name: string;
  company: ICompany;
}
