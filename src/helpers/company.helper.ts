import { environment } from "../environments";
import { ICompany } from "../interfaces/company.interface";

export const companyHelper = {
  getLogo(company: ICompany): string {
    return `${environment.server}/assets/${company.logo}?fit=cover&width=128&height=128`;
  },
};
