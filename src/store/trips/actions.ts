import { createAsyncThunk } from "@reduxjs/toolkit";
import { ITrip } from "../../components/common/Trips/types/types";
import { ActionType } from "./common";
import TripService from "../../services/api/TripService";

const getTrips = createAsyncThunk<ITrip[], void>(
  ActionType.GET_TRIPS,
  async () => {
    return TripService.getTrips();
  }
);

const getTrip = createAsyncThunk<ITrip, string>(
  ActionType.GET_TRIP,
  async (tripId) => {
    return TripService.getTrip(tripId);
  }
);

export { getTrips, getTrip };
