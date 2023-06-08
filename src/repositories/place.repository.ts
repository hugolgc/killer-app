import { environment } from "../environments";
import { notificationService } from "../services/notification.service";
import { placeFactory } from "../factories/place.factory";
import { dataHelper } from "../helpers/data.helper";
import { IPlace } from "../interfaces/place.interface";

const api = environment.api();

export const placeRepository = {
  async getPlace(id: number): Promise<IPlace> {
    try {
      const company = await api
        .items("places")
        .readOne(id, placeFactory.getPlace());

      return dataHelper.to<IPlace>(company);
    } catch (e) {
      notificationService.throw(e, "Votre liens d'inscription est expiré");
      throw new Error();
    }
  },
};
