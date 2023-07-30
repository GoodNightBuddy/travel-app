import { createAsyncThunk } from "@reduxjs/toolkit";
import { IResponse, IUserTdo, UserSignInDto, UserSignOutDto } from "../types/types";
import { ActionType } from "./common";
import AuthService from "../../services/api/AuthService";


const signOut = createAsyncThunk<UserSignOutDto, void>(
  ActionType.SIGN_OUT,
  async () => {
    return AuthService.signOut();
  }
);

const signUp = createAsyncThunk<IResponse, UserSignInDto>(
  ActionType.SIGN_UP,
  async (user) => {
    return AuthService.signUp(user);
  }
);

const signIn = createAsyncThunk<IResponse, UserSignInDto>(
  ActionType.SIGN_IN,
  async (user) => {
    return AuthService.signIn(user);
  }
);

const reSignIn = createAsyncThunk<IUserTdo>(
  ActionType.RESIGN_IN,
  async () => {
    return AuthService.reSignIn();
  }
);

export { signIn, reSignIn, signUp, signOut };
