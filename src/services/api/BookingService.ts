import { IBooking } from "../../components/pages/BookingPage/types/types";
import ApiRoutes from "../../enums/api/ApiRoutes";
import { BookingDto, deleteBookingDto } from "../../store/types/types";
import { withErrorHandling } from "../error/HandleApiError";
import TokenService from "../token/TokenService";

class BookingService {
  private static getApiUrlForBooking(bookingId?: string) {
    const baseUrl = ApiRoutes.BOOKINGS;
    return bookingId ? `${baseUrl}/${bookingId}` : baseUrl;
  }

  static async getBookings(): Promise<IBooking[]> {
    const token = TokenService.getToken();
    const response = await fetch(ApiRoutes.BOOKINGS, {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${token}`
      },
    });

    if (!response.ok) {
      const { message } = await response.json();
      throw new Error(message);
    }

    const bookings = await response.json() as IBooking[];
    return bookings;
  }

  static async makeBooking(bookingData: BookingDto): Promise<IBooking> {
    const token = TokenService.getToken();
    const response = await fetch(BookingService.getApiUrlForBooking(), {
      method: 'POST',
      body: JSON.stringify(bookingData),
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
    });

    if (!response.ok) {
      const { message } = await response.json();
      throw new Error(message);
    }

    const booking = await response.json() as IBooking;
    return booking;
  }

  static async deleteBooking({ bookingId }: deleteBookingDto): Promise<deleteBookingDto> {
    const token = TokenService.getToken();
    const response = await fetch(BookingService.getApiUrlForBooking(bookingId), {
      method: 'DELETE',
      headers: {
        "Authorization": `Bearer ${token}`
      },
    });

    if (!response.ok) {
      const { message } = await response.json();
      throw new Error(message);
    }

    return { bookingId };
  }
}

BookingService.getBookings = withErrorHandling(BookingService.getBookings);
BookingService.makeBooking = withErrorHandling(BookingService.makeBooking);
BookingService.deleteBooking = withErrorHandling(BookingService.deleteBooking);

export default BookingService;
