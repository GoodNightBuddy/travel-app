import { createAsyncThunk } from "@reduxjs/toolkit";
import { IBooking } from "../../components/pages/BookingPage/types/types";
import { BookingDto, deleteBookingDto } from "../types/types";
import { ActionType } from "./common";
import BookingService from "../../services/api/BookingService";
import { CustomError } from "../../services/error/CustomError";
import { authActionCreator } from "../action";

const getBookings = createAsyncThunk(
  ActionType.GET_BOOKINGS,
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const res = await BookingService.getBookings();
      return res;
    } catch (error) {
      if (error instanceof CustomError && error.statusCode === 401) {
        dispatch(authActionCreator.signOut());
      }
      return rejectWithValue({ error: error instanceof Error ? error.message : String(error) });
    }
  }
);

const makeBooking = createAsyncThunk<IBooking, BookingDto>(
  ActionType.MAKE_BOOKING,
  async (bookingData, { dispatch, rejectWithValue }) => {
    try {
      const res = await BookingService.makeBooking(bookingData);
      return res;
    } catch (error) {
      if (error instanceof CustomError && error.statusCode === 401) {
        dispatch(authActionCreator.signOut());
      }
      return rejectWithValue({ error: error instanceof Error ? error.message : String(error) });
    }
  }
);

const deleteBooking = createAsyncThunk<deleteBookingDto, deleteBookingDto>(
  ActionType.DELETE_BOOKING,
  async ({ bookingId }, { dispatch, rejectWithValue }) => {
    try {
      const res = await BookingService.deleteBooking({ bookingId });
      return res;
    } catch (error) {
      if (error instanceof CustomError && error.statusCode === 401) {
        dispatch(authActionCreator.signOut());
      }
      return rejectWithValue({ error: error instanceof Error ? error.message : String(error) });
    }
  }
);

export { getBookings, deleteBooking, makeBooking };
