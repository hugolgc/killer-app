import { reactive } from "vue";
import { INotification } from "../interfaces/notification.interface";

interface IState {
  notifications: INotification[];
  addNotification(value: string): void;
  getIndexOfNotification(notification: INotification): number;
  closeNotification(notification: INotification): void;
  throw(error: any, value: string): void;
}

export const notificationService = reactive<IState>({
  notifications: [],

  addNotification(value: string): void {
    const notification = {
      id: Date.now(),
      value,
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
    this.notifications[index].active = false;
  },

  throw(error: any, value: string): void {
    this.addNotification(value);
    console.error(error);
  },
});
