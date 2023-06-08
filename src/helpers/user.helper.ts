import { environment } from "../environments";
import { ICredential } from "../interfaces/credential.interface";
import { IPlace } from "../interfaces/place.interface";
import { ISwitch } from "../interfaces/swtich.interface";
import { IUserDto } from "../interfaces/user-dto.interface";
import { IUser } from "../interfaces/user.interface";

export const userHelper = {
  getAvatar(user: IUser): string {
    return `${environment.server}/assets/${user.avatar}?fit=cover&width=128&height=128`;
  },

  getFullName(user: IUser): string {
    return `${user.first_name} ${user.last_name}`;
  },

  getQRCode(user: IUser): string {
    return `${environment.qrcode}/v1/create-qr-code/?size=192x192&data=${user.id}`;
  },

  getUsersFromSwitch(
    currentUser: IUser,
    users: IUser[],
    item: ISwitch
  ): IUser[] {
    if (item.slug === "service") {
      return users.filter(
        (user) =>
          user.service.id === currentUser.service.id &&
          user.place.id === currentUser.place.id
      );
    }

    if (item.slug === "location") {
      return users.filter((user) => user.place.id === currentUser.place.id);
    }

    return users;
  },

  getDescriptionFromSwitch(user: IUser, item: ISwitch): string {
    if (item.slug === "service") {
      const completedMissions = user.missions.filter((mission) => {
        return mission.completed;
      });

      return `${completedMissions.length} mission${
        completedMissions.length > 1 ? "s" : ""
      }`;
    }

    if (item.slug === "location") {
      return user.service.name;
    }

    return user.place.name;
  },

  getUserDto(credential: ICredential, place: IPlace): IUserDto {
    return {
      ...credential,
      place: place.id,
      company: place.company.id,
    };
  },
};
