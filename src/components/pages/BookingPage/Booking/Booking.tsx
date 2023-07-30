import { useDispatch } from 'react-redux';
import { bookingsActionCreator } from '../../../../store/action';
import { AppDispatch } from '../../../../store/types/types';
import { IBookingProps } from '../types/types';
import './styles.scss';

const Booking: React.FC<IBookingProps> = ({booking}) => {
  const date = new Date(booking.date).toLocaleDateString();

  const dispatch = useDispatch() as AppDispatch;

  const deleteBooking: React.MouseEventHandler<HTMLButtonElement> = () => {
    dispatch(
      bookingsActionCreator.deleteBooking({ bookingId: booking.id })
    );
  };

  return (
    <li className="booking" data-test-id="booking">
      <h3 className="booking__title" data-test-id="booking-title">
        {booking.trip.title}
      </h3>
      <span className="booking__guests" data-test-id="booking-guests">
        {booking.guests}
      </span>
      <span className="booking__date" data-test-id="booking-date">
        {date}
      </span>
      <span className="booking__total" data-test-id="booking-total">
        {booking.totalPrice} $
      </span>
      <button
        data-test-id="booking-cancel"
        className="booking__cancel"
        title="Cancel booking"
        onClick={deleteBooking}
      >
        <span className="visually-hidden">Cancel booking</span>×
      </button>
    </li>
  );
};

export default Booking;
