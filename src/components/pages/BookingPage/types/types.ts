interface IBooking {
  id: string;
  userId: string;
  tripId: string;
  guests: number;
  date: string;
  trip: {
    title: string;
    duration: number;
    price: number;
  };
  totalPrice: number;
  createdAt: string;
}

interface IBookingProps {
  booking: IBooking,
}

export type { IBooking, IBookingProps }