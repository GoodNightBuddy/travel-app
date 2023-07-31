import { toast } from "react-toastify";

export function handleApiError(error: any) {
  if (error instanceof Error) {
    toast.error(error.message, {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }
  console.error(error);
}

export function withErrorHandling<T, U>(fn: (...args: T[]) => Promise<U>) {
  return async (...args: T[]): Promise<U> => {
    try {
      return await fn(...args);
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  };
}
