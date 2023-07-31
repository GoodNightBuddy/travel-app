import { configureStore } from "@reduxjs/toolkit";
import { authReducer, bookingsReducer, tripsReducer } from "./rootReducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    trips: tripsReducer,
    bookings: bookingsReducer
  }
})

export { store };