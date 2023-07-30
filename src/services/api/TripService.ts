import { ITrip } from "../../components/common/Trips/types/types";
import TokenService from "../token/TokenService";
import ApiRoutes from "../../enums/api/ApiRoutes";
import { CustomError } from "../error/CustomError";

class TripService {
  static async getTrips(): Promise<ITrip[]> {
    const token = TokenService.getToken();
    const response = await fetch(ApiRoutes.TRIPS, {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${token}`
      },
    });
    

    if (!response.ok) {
      const { error, message, statusCode } = await response.json();
      throw new CustomError(message, error, statusCode);
    }

    const trips = await response.json() as ITrip[];
    return trips;
  }

  static async getTrip(tripId: string): Promise<ITrip> {
    const token = TokenService.getToken();
    const response = await fetch(`${ApiRoutes.TRIPS}/${tripId}`, {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${token}`
      },
    });

    if (!response.ok) {
      const { error, message, statusCode } = await response.json();
      throw new CustomError(message, error, statusCode);
    }

    const currentTrip = await response.json() as ITrip;
    return currentTrip;
  }
}

export default TripService;
