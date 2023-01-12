import { createAction, props } from "@ngrx/store";
import { User } from "./model/user.model";

export const USER_LOGIN = "[Login Page] User Login";
export const USER_LOGOUT = "[Top Menu] User Logout";
export const login = createAction(USER_LOGIN, props<{ user: User }>());

export const logout = createAction(USER_LOGOUT);
