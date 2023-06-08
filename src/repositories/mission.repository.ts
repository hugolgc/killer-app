import { environment } from "../environments";
import { notificationService } from "../services/notification.service";
import { missionFactory } from "../factories/mission.factory";
import { dataHelper } from "../helpers/data.helper";
import { IMissionDto } from "../interfaces/mission-dto.interface";
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
      notificationService.throw(e, "Une erreur est survenue");
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
      notificationService.throw(e, "Une erreur est survenue");
      throw new Error();
    }
  },

  async createMissions(
    missionsDto: IMissionDto[],
    user: IUser
  ): Promise<IMission[]> {
    try {
      const missions = await api
        .items("missions")
        .createMany(missionsDto, missionFactory.getMissionsFromUser(user));
      return dataHelper.to<IMission[]>(missions.data);
    } catch (e) {
      notificationService.throw(e, "Une erreur est survenue");
      throw new Error();
    }
  },

  async updateMission(
    id: number,
    missionDto: Partial<IMission>
  ): Promise<void> {
    try {
      await api.items("missions").updateOne(id, missionDto);
    } catch (e) {
      notificationService.throw(e, "Une erreur est survenue");
      throw new Error();
    }
  },
};
