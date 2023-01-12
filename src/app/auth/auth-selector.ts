import { createFeatureSelector, createSelector } from "@ngrx/store";
// import { AppState } from "../reducers";
import { AuthState } from "./reducers";

export const selectAuthState = createFeatureSelector<AuthState>("auth");
export const isLoggedIn = createSelector(
  selectAuthState,
  (auth) => !!auth.user
);

// export const isLoggedIn = createSelector(
//   (state: AppState) => state.auth,
//   (auth) => !!auth.user
// );

export const isLoggedOut = createSelector(isLoggedIn, (loggedIn) => !loggedIn);
