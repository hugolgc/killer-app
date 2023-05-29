import { reactive } from "vue";
import { INotification } from "../interfaces/notification.interface";
import { INotificationDto } from "../interfaces/notification-dto.interface";

interface IState {
  notifications: INotification[];
  addNotification(notificationDto: INotificationDto): void;
  getIndexOfNotification(notification: INotification): number;
  closeNotification(notification: INotification): void;
  throw(error: any, value: string): void;
}

export const notificationService = reactive<IState>({
  notifications: [],

  addNotification(notificationDto: INotificationDto): void {
    const notification = {
      ...notificationDto,
      id: Date.now(),
      active: true,
    };

    this.notifications.push(notification);
    setTimeout(() => this.closeNotification(notification), 4_000);
  },

  getIndexOfNotification(notification: INotification): number {
    return this.notifications.indexOf(notification);
  },

  closeNotification(notification: INotification): void {
    const index = this.getIndexOfNotification(notification);
    console.log(index);
    this.notifications[index].active = false;
  },

  throw(error: any, value: string): void {
    this.addNotification({ value });
    console.error(error);
  },
});
