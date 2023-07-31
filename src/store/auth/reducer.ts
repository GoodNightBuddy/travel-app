import { createReducer, isAnyOf } from "@reduxjs/toolkit";
import { IStateAuth} from "../types/types";
import { signUp, signIn, reSignIn, signOut } from "./actions";

const initialState: IStateAuth = {
  user: null,
  loading: false,
  isSigned: true,
}
const reducer = createReducer(initialState, (builder) => {
  builder
    .addMatcher(
      isAnyOf(
        signIn.pending,
        signOut.pending,
        reSignIn.pending,
        signUp.pending
      ),
      state => {
        state.loading = true
      }
    )

    .addMatcher(
      isAnyOf(
        signIn.fulfilled,
        signOut.fulfilled,
        reSignIn.fulfilled,
        signUp.fulfilled
      ),
      (state, action) => {
        state.loading = false
        state.user = action.payload.user
      }
    )

    .addMatcher(
      isAnyOf(
        signIn.rejected,
        signOut.rejected,
        reSignIn.rejected,
        signUp.rejected,
      ),
      (state, action) => {
        state.loading = false
        state.user = null
      }
    )
})

export { reducer };

