const base = process.env.REACT_APP_API_URL || '';

const ApiRoutes = {
  SIGN_UP: `${base}/auth/sign-up`,
  SIGN_IN: `${base}/auth/sign-in`,
  AUTH_USER: `${base}/auth/authenticated-user`,
  TRIPS: `${base}/trips`,
  BOOKINGS: `${base}/bookings`,
} as const;

export default ApiRoutes;
