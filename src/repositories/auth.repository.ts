import { environment } from "../environments";
import { AuthResult } from "@directus/sdk";
import { ICredential } from "../interfaces/credential.interface";

const api = environment.api();

export const authRepository = {
  login(credential: ICredential): Promise<AuthResult> {
    return api.auth.login(credential);
  },

  logout(): Promise<void> {
    return api.auth.logout();
  },
};
