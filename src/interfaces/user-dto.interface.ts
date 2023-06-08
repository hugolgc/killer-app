import { ICredential } from "./credential.interface";

export interface IUserDto extends ICredential {
  place: number;
  company: number;
}
