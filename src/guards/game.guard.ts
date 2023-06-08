import { userService } from "../services/user.service";

export function gameGuard() {
  return userService.user ? true : "/auth/login";
}
