import { reactive } from "vue";
import { authRepository } from "../repositories/auth.repository";
import { AuthResult } from "@directus/sdk";
import { ICredential } from "../interfaces/credential.interface";

interface IState {
  credential: ICredential;
  login(): Promise<AuthResult>;
  logout(): Promise<void>;
}

export const authService = reactive<IState>({
  credential: {
    email: "hugo.lagache@play-ads.com",
    password: "----",
  },

  login(): Promise<AuthResult> {
    return authRepository.login(this.credential);
  },

  logout(): Promise<void> {
    return authRepository.logout();
  },
});
