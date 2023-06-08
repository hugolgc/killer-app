import { dataHelper } from "./data.helper";
import { OBJECTIVES } from "../mocks/objectives.mock";
import { IUser } from "../interfaces/user.interface";
import { IMission } from "../interfaces/mission.interface";
import { IMissionDto } from "../interfaces/mission-dto.interface";
import { IObjective } from "../interfaces/objective.interface";
import { TObjective } from "../types/objective.type";
import dayjs from "dayjs";

export const missionHelper = {
  getTypeName(mission: IMission): string {
    if (mission.objective.type === "month") {
      return "Mission du mois";
    }

    if (mission.objective.type === "week") {
      return "Mission de la semaine";
    }

    return "Mission du jour";
  },

  getPercentage(mission: IMission): string {
    const dateNow = dayjs();
    const dateStart = dayjs(mission.start);
    const dateEnd = dayjs(mission.end);

    return `${Math.floor(
      (dateNow.diff(dateStart) / dateEnd.diff(dateStart)) * 100
    )}%`;
  },

  getCountdown(mission: IMission): string {
    const dateNow = dayjs();
    const dateEnd = dayjs(mission.end);

    const remainingDays = dateEnd.diff(dateNow, "days");
    if (remainingDays > 1) {
      return `${remainingDays} jours restants`;
    }

    const remainingHours = dateEnd.diff(dateNow, "hours");
    if (remainingHours > 1) {
      return `${remainingHours} heures restantes`;
    }

    return `Bientôt terminée`;
  },

  getMissionsByObjectiveType(missions: IMission[], objectiveType: TObjective) {
    return missions.filter((mission) => {
      return mission.objective.type === objectiveType;
    });
  },

  getMissingObjectiveTypes(missions: IMission[]) {
    const missingObjectiveTypes: TObjective[] = [];

    OBJECTIVES.forEach((objectiveType) => {
      if (!this.getMissionsByObjectiveType(missions, objectiveType).length) {
        missingObjectiveTypes.push(objectiveType);
      }
    });

    return missingObjectiveTypes;
  },

  getMissionsDto(
    objectivesType: TObjective[],
    objectives: IObjective[],
    targets: IUser[]
  ): IMissionDto[] {
    const now = dayjs();
    const missionsDto: IMissionDto[] = [];

    objectivesType.forEach((objectiveType) => {
      const objectivesOfType = objectives.filter((objective) => {
        return objective.type === objectiveType;
      });

      if (!objectivesOfType.length) return;

      missionsDto.push({
        target_user: dataHelper.getRandomFromArray(targets).id,
        objective: dataHelper.getRandomFromArray(objectivesOfType).id,
        start: dataHelper.getDateISO(now.startOf(objectiveType)),
        end: dataHelper.getDateISO(now.endOf(objectiveType)),
      });
    });

    return missionsDto;
  },
};
