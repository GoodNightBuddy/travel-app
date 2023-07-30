import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { bookingsActionCreator } from '../../../store/action';
import { ITrip } from '../../common/Trips/types/types';
import { AppDispatch, useAppSelector } from '../../../store/types/types';
import { Loader } from '../../common/Loader/Loader';

type TripModalProps = {
  trip: ITrip;
  show: boolean;
  closeModal: () => void;
};

const TripModal: React.FC<TripModalProps> = ({ trip, show, closeModal }) => {
  const dispatch = useDispatch() as AppDispatch;
  const [guests, setGuests] = useState(1);
  const [date, setDate] = useState(new Date());
  const [totalPrice, setTotalPrice] = useState(0);
  const user = useAppSelector(state => state.auth.user);
  const isLoadingBooking = useAppSelector(state => state.bookings.loading);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault();
    if (new Date() >= date) {
      return toast.warning('Please, enter correct date', {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }

    const bookingData = {
      tripId: trip?.id,
      userId: user?.id,
      guests,
      date: date.toISOString(),
    };

    try {
      await dispatch(bookingsActionCreator.makeBooking(bookingData));

      closeModal();

      toast.success('Trip was successfully booked', {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
    } catch (error) {
      console.log(error);
      toast.error((error as Error).message, {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
    }
  };

  const handleClick: React.MouseEventHandler<HTMLDivElement> = e => {
    const modal = e.target as HTMLDivElement;
    if (modal.classList.contains('modal')) {
      closeModal();
    }
  };

  const guestsHandler: React.ChangeEventHandler<HTMLInputElement> = e => {
    setGuests(+e.target.value);
    if (!trip) {
      return;
    }
    setTotalPrice(+trip?.price * +e.target.value);
  };

  const dateHandler: React.ChangeEventHandler<HTMLInputElement> = e => {
    setDate(new Date(e.target.value));
  };

  if (isLoadingBooking) {
    return <Loader />;
  }

  return (
    <div hidden={!show}>
      <div className="modal" onClick={handleClick}>
        <div className="book-trip-popup" data-test-id="book-trip-popup">
          <button
            className="book-trip-popup__close"
            onClick={closeModal}
            data-test-id="book-trip-popup-close"
          >
            ×
          </button>
          <form
            className="book-trip-popup__form"
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <div className="trip-info">
              <h3
                className="trip-info__title"
                data-test-id="book-trip-popup-title"
              >
                {trip.title}
              </h3>
              <div className="trip-info__content">
                <span
                  className="trip-info__duration"
                  data-test-id="book-trip-popup-duration"
                >
                  <strong>{trip.duration}</strong> days
                </span>
                <span
                  className="trip-info__level"
                  data-test-id="book-trip-popup-level"
                >
                  {trip.level}
                </span>
              </div>
            </div>
            <label className="trip-popup__input input">
              <span className="input__heading">Date</span>
              <input
                name="date"
                type="date"
                onChange={dateHandler}
                required
                data-test-id="book-trip-popup-date"
              />
            </label>
            <label className="trip-popup__input input">
              <span className="input__heading">Number of guests</span>
              <input
                name="guests"
                type="number"
                min="1"
                max="10"
                value={guests}
                onChange={guestsHandler}
                required
                data-test-id="book-trip-popup-guests"
              />
            </label>
            <span className="book-trip-popup__total">
              Total:{' '}
              <output
                className="book-trip-popup-total-value"
                data-test-id="book-trip-popup-total-value"
              >
                {totalPrice ? totalPrice : trip.price} $
              </output>
            </span>
            <button
              className="button"
              type="submit"
              data-test-id="book-trip-popup-submit"
            >
              Book a trip
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TripModal;
