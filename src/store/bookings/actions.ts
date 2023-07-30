import { createAsyncThunk } from "@reduxjs/toolkit";
import { IBooking } from "../../components/pages/BookingPage/types/types";
import { BookingDto, deleteBookingDto } from "../types/types";
import { ActionType } from "./common";
import BookingService from "../../services/api/BookingService";

const getBookings = createAsyncThunk(
  ActionType.GET_BOOKINGS,
  async () => {
    return BookingService.getBookings();
  }
);

const makeBooking = createAsyncThunk<IBooking, BookingDto>(
  ActionType.MAKE_BOOKING,
  async (bookingData) => {
    return BookingService.makeBooking(bookingData);
  }
);

const deleteBooking = createAsyncThunk<deleteBookingDto, deleteBookingDto>(
  ActionType.DELETE_BOOKING,
  async ({ bookingId }) => {
    return BookingService.deleteBooking({ bookingId });
  }
);

export { getBookings, deleteBooking, makeBooking };
