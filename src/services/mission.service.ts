import { reactive } from "vue";
import { userService } from "./user.service";
import { userRepository } from "../repositories/user.repository";
import { missionRepository } from "../repositories/mission.repository";
import { objectiveRepository } from "../repositories/objective.repository";
import { dataHelper } from "../helpers/data.helper";
import { missionHelper } from "../helpers/mission.helper";
import { IUser } from "../interfaces/user.interface";
import { IPlace } from "../interfaces/place.interface";
import { IMission } from "../interfaces/mission.interface";
import { TObjective } from "../types/objective.type";
import dayjs from "dayjs";

interface IState {
  missions: IMission[];
  activities: IMission[];
  getMissionsFromUser(user: IUser): void;
  getMissionsFromPlace(place: IPlace): void;
  createMissionsFromObjectiveTypes(types: TObjective[]): Promise<void>;
  completeMission(mission: IMission): Promise<void>;
}

export const missionService = reactive<IState>({
  missions: [],
  activities: [],

  getMissionsFromUser(user: IUser) {
    missionRepository.getMissionsFromUser(user).then((missions) => {
      this.missions = missions;

      this.createMissionsFromObjectiveTypes(
        missionHelper.getMissingObjectiveTypes(this.missions)
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

    const targets = users.filter((user) => user.id !== current.id);
    if (!targets.length) return;

    const missionsDto = missionHelper.getMissionsDto(
      objectiveTypes,
      objectives,
      targets
    );

    missionRepository.createMissions(missionsDto, current).then((missions) => {
      this.missions = [...this.missions, ...missions];
    });
  },

  async completeMission(mission: IMission): Promise<void> {
    if (!userService.user) return;
    userService.user.points += mission.objective.points;

    await userRepository.updateUser(userService.user.id, {
      points: userService.user.points,
    });

    await missionRepository.updateMission(mission.id, {
      completed: dataHelper.getDateISO(dayjs()),
    });
  },
});
