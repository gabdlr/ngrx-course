import { Component, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from "@angular/router";
import { AppState } from "./reducers";
import { isLoggedIn, isLoggedOut } from "./auth/auth-selector";
import { login, logout } from "./auth/auth.actions";
import { BrowserStorageService } from "./browser-storage.service";
import { User } from "./auth/model/user.model";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;
  loading = true;

  constructor(
    private browserStorageService: BrowserStorageService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    const userProfile = this.browserStorageService.get("user");
    if (userProfile) {
      const user: User = JSON.parse(userProfile);
      this.store.dispatch(login({ user }));
      this.router.navigateByUrl("/courses");
    }
    this.isLoggedIn$ = this.store.pipe(select(isLoggedIn));
    this.isLoggedOut$ = this.store.pipe(select(isLoggedOut));
    this.router.events.subscribe((event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  logout() {
    this.store.dispatch(logout());
  }
}
