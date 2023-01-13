import { routerReducer } from "@ngrx/router-store";
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from "@ngrx/store";
import { environment } from "../../environments/environment";

export interface AppState {
  // auth: AuthState;
}

export const reducers: ActionReducerMap<AppState> = {
  // auth: undefined,
  router: routerReducer,
};

export function logger(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    console.log("prev. state:", state);
    console.log("current action:", state);
    return reducer(state, action);
  };
}
export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? [logger]
  : [];
