import { configureStore } from "@reduxjs/toolkit";
import { authReducer, bookingsReducer, tripsReducer } from "./rootReducer";



const store = configureStore({
  reducer: {
    auth: authReducer,
    trips: tripsReducer,
    bookings: bookingsReducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    thunk: {
      extraArgument: {
        // хотів зробити як в міні проекті, щоб було гарніше, але не встиг
      }
    }
  }),
})

export { store };