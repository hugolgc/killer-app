import { reactive } from "vue";
import { missionRepository } from "../repositories/mission.repository";
import { IMission } from "../interfaces/mission.interface";
import { IUser } from "../interfaces/user.interface";
import { IPlace } from "../interfaces/place.interface";
import { TObjective } from "../types/objective.type";
import { missionHelper } from "../helpers/mission.helper";
import { userService } from "./user.service";
import { userRepository } from "../repositories/user.repository";
import { objectiveRepository } from "../repositories/objective.repository";

interface IState {
  missions: IMission[];
  activities: IMission[];
  getMissionsFromUser(user: IUser): void;
  getMissionsFromPlace(place: IPlace): void;
  createMissionsFromObjectiveTypes(types: TObjective[]): Promise<void>;
}

export const missionService = reactive<IState>({
  missions: [],
  activities: [],

  getMissionsFromUser(user: IUser) {
    missionRepository.getMissionsFromUser(user).then((missions) => {
      this.missions = missions;

      this.createMissionsFromObjectiveTypes(
        missionHelper.getMissingObjectiveTypes(missions)
      );
    });
  },

  getMissionsFromPlace(place: IPlace): void {
    missionRepository.getMissionsFromPlace(place).then((activities) => {
      this.activities = activities;
    });
  },

  async createMissionsFromObjectiveTypes(objectiveTypes: TObjective[]) {
    const current = userService.user;
    if (!objectiveTypes.length || !current) return;

    const [users, objectives] = await Promise.all([
      userRepository.getActiveUsersFromPlace(current.place),
      objectiveRepository.getObjectives(),
    ]);

    const missionsDto = missionHelper.getMissionsDto(
      objectiveTypes,
      objectives,
      current,
      users
    );

    missionRepository.createMissions(missionsDto, current).then((missions) => {
      this.missions = [...this.missions, ...missions];
    });
  },
});
