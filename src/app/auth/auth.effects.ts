import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { tap } from "rxjs/operators";

import { BrowserStorageService } from "../browser-storage.service";
import { AuthActions } from "./actions-types";
import { USER_LOGIN } from "./auth.actions";

@Injectable()
export class AuthEffects {
  login$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.login),
        tap((action) =>
          this.browserStorageService.set("user", JSON.stringify(action.user))
        )
      ),
    { dispatch: false }
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          this.browserStorageService.remove("user"),
            this.router.navigateByUrl("/");
        })
      ),
    { dispatch: false }
  );
  constructor(
    private actions$: Actions,
    private browserStorageService: BrowserStorageService,
    private router: Router
  ) {}
}
