import { reactive } from "vue";
import { INotification } from "../interfaces/notification.interface";
import { INotificationDto } from "../interfaces/notification-dto.interface";

interface IState {
  notifications: INotification[];
  add(notificationDto: INotificationDto): void;
  throw(error: any, value: string): void;
  close(index: number): void;
}

export const notificationService = reactive<IState>({
  notifications: [],

  add(notificationDto: INotificationDto): void {
    const index = this.notifications.push({ ...notificationDto, active: true });
    console.log(index);

    setTimeout(() => this.close(index), 3_000);
  },

  throw(error: any, value: string): void {
    this.add({ value, type: "error" });
    console.error(error);
  },

  close(index: number): void {
    this.notifications[index].active = false;
  },
});
