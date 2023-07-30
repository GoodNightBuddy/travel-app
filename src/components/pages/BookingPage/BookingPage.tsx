import Booking from './Booking/Booking';
import './styles.scss';
import { useEffect } from 'react';
import { AppDispatch, useAppSelector } from '../../../store/types/types';
import { useDispatch } from 'react-redux';
import { bookingsActionCreator } from '../../../store/action';
import { Loader } from '../../common/Loader/Loader';

const BookingPage: React.FC = () => {
  const dispatch = useDispatch() as AppDispatch;
  useEffect(() => {
    dispatch(bookingsActionCreator.getBookings());
  }, [dispatch]);

  const bookings = useAppSelector(state => state.bookings.bookings);
  const isLoading = useAppSelector(state => state.bookings.loading);

  if (isLoading) {
    return <Loader />;
  }

  if (!bookings.length) {
    return <div className="noresult">Nema broni:(</div>;
  }

  return (
    <main className="bookings-page">
      <h1 className="visually-hidden">Travel App</h1>
      <ul className="bookings__list">
        {bookings.map((booking) => (
          <Booking booking={booking} key={booking.id} />
        ))}
      </ul>
    </main>
  );
};

export default BookingPage;
