import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { ITrip } from '../../components/common/Trips/types/types';
import { IBooking } from '../../components/pages/BookingPage/types/types';
import { store } from '../store';

interface IStateAuth {
  user: null | IUser,
  loading: boolean
  isSigned: boolean,
}

interface IStateBookings {
  loading: boolean,
  bookings: IBooking[] | []
}

interface IUser {
  id: string,
  fullName: string,
  email: string,
  createdAt: string
}

interface IUserTdo{
  user: IUser | null
}


interface IResponse {
  token: string,
  user: IUser
}

type UserSignInDto = {
  email: string,
  password: string
}

type UserSignOutDto = {
  user: null
}

type BookingDto = {
  tripId: string | undefined;
  userId: string | undefined;
  guests: number;
  date: string;
}

type deleteBookingDto = {
  bookingId: string;
}

interface IStateTrips {
  loading: boolean;
  trips: ITrip[];
  currentTrip: ITrip | null;
}

type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export { useAppSelector };
export type {
  IStateAuth,
  RootState,
  AppDispatch,
  IUser,
  IResponse,
  UserSignInDto,
  UserSignOutDto,
  IStateTrips,
  IUserTdo,
  IStateBookings,
  BookingDto,
  deleteBookingDto
};