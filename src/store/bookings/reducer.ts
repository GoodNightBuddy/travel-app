import { createReducer, isAnyOf } from "@reduxjs/toolkit";
import { IStateBookings } from "../types/types";
import { deleteBooking, getBookings, makeBooking } from "./actions";

const initialState: IStateBookings = {
  loading: false,
  bookings: []
}

const reducer = createReducer(initialState, builder => {
  builder
    .addCase(getBookings.fulfilled, (state, action) => {
      state.loading = false
      state.bookings = action.payload
    })
    .addCase(makeBooking.fulfilled, (state, action) => {
      state.loading = false
      state.bookings = [...state.bookings, action.payload]
    })
    .addCase(deleteBooking.fulfilled, (state, action) => {
      state.loading = false;
      const deletedBookingId = action.payload.bookingId;
      state.bookings = state.bookings.filter((booking) => booking.id !== deletedBookingId);
    })
    .addMatcher(
      isAnyOf(
        getBookings.rejected,
        makeBooking.rejected,
        deleteBooking.rejected
      ),
      (state, action) => {
        state.loading = false
      }
    )
    .addMatcher(
      isAnyOf(
        getBookings.pending,
        makeBooking.pending,
        deleteBooking.pending
      ),
      (state, action) => {
        state.loading = true
      }
    )
})

export { reducer }