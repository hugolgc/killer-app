import { dataHelper } from "../helpers/data.helper";
import { IPlace } from "../interfaces/place.interface";
import { IUser } from "../interfaces/user.interface";
import dayjs from "dayjs";

export const missionFactory = {
  getMissionsFromUser(user: IUser) {
    const now = dataHelper.getDateISO(dayjs());

    return {
      fields: [
        "id",
        "start",
        "end",
        "current_user.id",
        "current_user.avatar",
        "target_user.id",
        "target_user.first_name",
        "target_user.last_name",
        "target_user.avatar",
        "target_user.service.name",
        "objective.points",
        "objective.type",
        "objective.value",
      ],
      filter: {
        current_user: user.id,
        completed: { _null: true },
        start: { _lte: now },
        end: { _gte: now },
      },
    };
  },

  getMissionsFromPlace(place: IPlace) {
    return {
      fields: [
        "current_user.first_name",
        "current_user.last_name",
        "current_user.avatar",
        "target_user.first_name",
        "target_user.last_name",
        "target_user.avatar",
        "objective.type",
        "objective.points",
      ],
      filter: {
        completed: { _nnull: true },
        current_user: { place: place.id },
      },
      sort: "-completed",
      limit: 50,
    };
  },
};
