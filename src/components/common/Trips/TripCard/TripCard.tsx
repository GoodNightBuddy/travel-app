/* eslint-disable jsx-a11y/img-redundant-alt */
import { Link } from 'react-router-dom';
import { TripCardProps } from '../types/types';
import './styles.scss';
import AppRouter from '../../../../enums/routes/AppRouter';

const TripCard: React.FC<TripCardProps> = props => {
  return (
    <li className="trip-card" data-test-id="trip-card">
      <img
        src={props.tripInfo.image}
        alt="trip image"
        data-test-id="trip-card-image"
      />
      <div className="trip-card__content">
        <div className="trip-info">
          <h3 className="trip-info__title" data-test-id="trip-card-title">
            {props.tripInfo.title}
          </h3>
          <div className="trip-info__content">
            <span
              className="trip-info__duration"
              data-test-id="trip-card-duration"
            >
              <strong>{props.tripInfo.duration}</strong> days
            </span>
            <span className="trip-info__level" data-test-id="trip-card-level">
              {props.tripInfo.level}
            </span>
          </div>
        </div>
        <div className="trip-price">
          <span>Price</span>
          <strong
            className="trip-price__value"
            data-test-id="trip-card-price-value"
          >
            {props.tripInfo.price} $
          </strong>
        </div>
      </div>
      <Link
        to={`${AppRouter.TRIP}${props.tripInfo.id}`}
        className="button"
        data-test-id="trip-card-link"
      >
        Discover a trip
      </Link>
    </li>
  );
};

export default TripCard;
