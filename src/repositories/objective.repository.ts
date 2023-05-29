import { environment } from "../environments";
import { objectiveFactory } from "../factories/objective.factory";
import { dataHelper } from "../helpers/data.helper";
import { IObjective } from "../interfaces/objective.interface";
import { notificationService } from "../services/notification.service";

const api = environment.api();

export const objectiveRepository = {
  async getObjectives(): Promise<IObjective[]> {
    try {
      const objectives = await api
        .items("objectives")
        .readByQuery(objectiveFactory.getObjectives());
      return dataHelper.to<IObjective[]>(objectives.data);
    } catch (e) {
      notificationService.throw(e, "Une erreur est survenue");
      throw new Error();
    }
  },
};
