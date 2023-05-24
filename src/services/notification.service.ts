import { reactive } from "vue";

interface IState {
  notifications: [];
  add(notificationDto: any): void;
}

export const notificationService = reactive<IState>({
  notifications: [],

  add(): void {},
});
