import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from "@ngrx/store";
import { environment } from "../../environments/environment";
import { User } from "../auth/model/user.model";
import { AuthState } from "../auth/reducers";

export interface AppState {
  // auth: AuthState;
}

export const reducers: ActionReducerMap<AppState> = {
  // auth: undefined,
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? []
  : [];
