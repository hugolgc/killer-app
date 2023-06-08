import { reactive } from "vue";
import { IPlace } from "../interfaces/place.interface";
import { placeRepository } from "../repositories/place.repository";

interface IState {
  getPlace(id: number): Promise<IPlace>;
}

export const placeService = reactive<IState>({
  getPlace(id: number): Promise<IPlace> {
    return placeRepository.getPlace(id);
  },
});
