import { IMission } from "../interfaces/mission.interface";
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
};
