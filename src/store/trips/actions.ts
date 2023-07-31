import { createAsyncThunk } from "@reduxjs/toolkit";
import { ITrip } from "../../components/common/Trips/types/types";
import { ActionType } from "./common";
import TripService from "../../services/api/TripService";
import { authActionCreator } from "../action";
import { CustomError } from "../../services/error/CustomError";

const getTrips = createAsyncThunk<ITrip[], void>(
  ActionType.GET_TRIPS,
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const res = await TripService.getTrips();
      return res;
    } catch (error) {
      if (error instanceof CustomError && error.statusCode === 401) {
        dispatch(authActionCreator.signOut());
      }
      return rejectWithValue({ error: error instanceof Error ? error.message : String(error) });
    }
  }
);


const getTrip = createAsyncThunk<ITrip, string>(
  ActionType.GET_TRIP,
  async (tripId, { dispatch, rejectWithValue }) => {
    try {
      const res = await TripService.getTrip(tripId);
      return res;
    } catch (error) {
      if (error instanceof CustomError && error.statusCode === 401) {
        dispatch(authActionCreator.signOut());
      }
      return rejectWithValue({ error: error instanceof Error ? error.message : String(error) });
    }
  }
);

export { getTrips, getTrip };
