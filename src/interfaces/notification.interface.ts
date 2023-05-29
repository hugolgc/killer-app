import { INotificationDto } from "./notification-dto.interface";

export interface INotification extends INotificationDto {
  id: number;
  active: boolean;
}
