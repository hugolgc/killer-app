import { reactive } from "vue";
import { missionRepository } from "../repositories/mission.repository";
import { IMission } from "../interfaces/mission.interface";
import { IUser } from "../interfaces/user.interface";
import { IPlace } from "../interfaces/place.interface";

interface IState {
  missions: IMission[];
  activities: IMission[];
  getMissionsFromUser(user: IUser): void;
  getMissionsFromPlace(place: IPlace): void;
}

export const missionService = reactive<IState>({
  missions: [],
  activities: [],

  getMissionsFromUser(user: IUser) {
    missionRepository.getMissionsFromUser(user).then((missions) => {
      this.missions = missions;
    });
  },

  getMissionsFromPlace(place: IPlace): void {
    missionRepository.getMissionsFromPlace(place).then((activities) => {
      this.activities = activities;
    });
  },
});
