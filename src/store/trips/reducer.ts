import { createReducer, isAnyOf } from "@reduxjs/toolkit";
import { IStateTrips } from "../types/types";
import { getTrip, getTrips } from "./actions";

const initialState: IStateTrips = {
  loading: false,
  trips: [],
  currentTrip: null
}



const reducer = createReducer(initialState, builder => {
  builder
    .addCase(getTrips.fulfilled, (state, action) => {
      state.loading = false
      state.trips = action.payload
    })

    .addCase(getTrip.fulfilled, (state, action) => {
      state.loading = false
      state.currentTrip = action.payload
    })

    .addMatcher(
      isAnyOf(
        getTrips.rejected,
        getTrip.rejected
      ),
      (state, action) => {
        state.loading = false
      }
    )

    .addMatcher(
      isAnyOf(
        getTrips.pending,
        getTrip.pending,
      ),
      (state, action) => {
        state.loading = true
      }
    )
})

export { reducer }