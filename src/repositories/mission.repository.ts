import { environment } from "../environments";
import { missionFactory } from "../factories/mission.factory";
import { dataHelper } from "../helpers/data.helper";
import { IMission } from "../interfaces/mission.interface";
import { IPlace } from "../interfaces/place.interface";
import { IUser } from "../interfaces/user.interface";
const api = environment.api();

export const missionRepository = {
  async getMissionsFromUser(user: IUser): Promise<IMission[]> {
    try {
      const missions = await api
        .items("missions")
        .readByQuery(missionFactory.getMissionsFromUser(user));

      return dataHelper.to<IMission[]>(missions.data);
    } catch (e) {
      console.warn(e);
      throw new Error();
    }
  },

  async getMissionsFromPlace(place: IPlace): Promise<IMission[]> {
    try {
      const missions = await api
        .items("missions")
        // @ts-ignore
        .readByQuery(missionFactory.getMissionsFromPlace(place));

      return dataHelper.to<IMission[]>(missions.data);
    } catch (e) {
      console.warn(e);
      throw new Error();
    }
  },
};
