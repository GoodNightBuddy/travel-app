/* eslint-disable jsx-a11y/img-redundant-alt */
import './styles.scss';
import { useEffect, useState } from 'react';
import { AppDispatch, useAppSelector } from '../../../store/types/types';
import { Loader } from '../../common/Loader/Loader';
import { useDispatch } from 'react-redux';
import { tripsActionCreator } from '../../../store/action';
import { useParams } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import TripModal from './TripModal';

const TripPage: React.FC = () => {
  const dispatch = useDispatch() as AppDispatch;
  const { tripId } = useParams();

  useEffect(() => {
    async function loadTrip(id: string) {
      await dispatch(tripsActionCreator.getTrip(id));
    }
    if (tripId) {
      loadTrip(tripId);
    }
  }, [dispatch, tripId]);

  const trip = useAppSelector(state => state.trips.currentTrip);
  const isLoadingTrip = useAppSelector(state => state.trips.loading);
  const isLoadingBooking = useAppSelector(state => state.bookings.loading);
  const [show, setShow] = useState(false);

  const showModal: React.MouseEventHandler<HTMLButtonElement> = e => {
    setShow(true);
  };

  const closeModal = () => {
    setShow(false);
  };

  if (isLoadingTrip || isLoadingBooking) {
    return <Loader />;
  }

  if (!trip) {
    return <div>Opps. Something went wong. Trip not found...</div>;
  }

  return (
    <>
      <main className="trip-page">
        <h1 className="visually-hidden">Travel App</h1>
        <div className="trip">
          <img
            src={trip.image}
            className="trip__img"
            alt="trip image"
            data-test-id="trip-details-image"
          />
          <div className="trip__content">
            <div className="trip-info">
              <h3
                className="trip-info__title"
                data-test-id="trip-details-title"
              >
                {trip.title}
              </h3>
              <div className="trip-info__content">
                <span
                  className="trip-info__duration"
                  data-test-id="trip-details-duration"
                >
                  <strong>{trip.duration}</strong> days
                </span>
                <span
                  className="trip-info__level"
                  data-test-id="trip-details-level"
                >
                  {trip.level}
                </span>
              </div>
            </div>
            <div
              className="trip__description"
              data-test-id="trip-details-description"
            >
              {trip.description}
            </div>
            <div className="trip-price">
              <span>Price</span>
              <strong
                className="trip-price__value"
                data-test-id="trip-details-price-value"
              >
                {trip.price} $
              </strong>
            </div>
            <button
              className="trip__button button"
              onClick={showModal}
              data-test-id="trip-details-button"
            >
              Book a trip
            </button>
          </div>
        </div>
      </main>
      <TripModal trip={trip} show={show} closeModal={closeModal} />
    </>
  );
};

export default TripPage;
