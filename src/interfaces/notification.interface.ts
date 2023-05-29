import { INotificationDto } from "./notification-dto.interface";

export interface INotification extends INotificationDto {
  active: boolean;
}
