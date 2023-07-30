import { IResponse, IUser, IUserTdo, UserSignInDto, UserSignOutDto } from "../../store/types/types";
import ApiRoutes from "../../enums/api/ApiRoutes";
import TokenService from "../token/TokenService";
import { withErrorHandling } from "../error/HandleApiError";

const HttpStatus = {
  SUCCESS: 200,
  CREATED: 201,
};

class AuthService {
  static async signOut(): Promise<UserSignOutDto> {
    TokenService.removeToken();
    return { user: null };
  }

  static async signUp(user: UserSignInDto): Promise<IResponse> {
    const response = await fetch(ApiRoutes.SIGN_UP, {
      body: JSON.stringify(user),
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
    });

    if (response.status !== HttpStatus.CREATED) {
      const { message } = await response.json();
      throw new Error(message,);
    }

    const res = await response.json() as IResponse;
    TokenService.setToken(res.token);
    return res;
  }

  static async signIn(user: UserSignInDto): Promise<IResponse> {
    const response = await fetch(ApiRoutes.SIGN_IN, {
      body: JSON.stringify(user),
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
    });

    if (response.status !== HttpStatus.SUCCESS) {
      const { message } = await response.json();
      throw new Error(message);
    }

    const res = await response.json() as IResponse;
    TokenService.setToken(res.token);
    return res;
  }

  static async reSignIn(): Promise<IUserTdo> {
    const token = TokenService.getToken();
    if (!token) {
      return { user: null }
    };
    const response = await fetch(ApiRoutes.AUTH_USER, {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${token}`
      },
    });

    if (response.status !== HttpStatus.SUCCESS) {
      const { message } = await response.json();
      TokenService.removeToken();
      throw new Error(message);
    }

    const user = await response.json() as IUser;
    return { user };
  }
}

AuthService.signOut = withErrorHandling(AuthService.signOut);
AuthService.signUp = withErrorHandling(AuthService.signUp);
AuthService.signIn = withErrorHandling(AuthService.signIn);
AuthService.reSignIn = withErrorHandling(AuthService.reSignIn);

export default AuthService;
