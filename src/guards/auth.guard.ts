import { userService } from "../services/user.service";

export function authGuard() {
  return userService.user ? "/" : true;
}
