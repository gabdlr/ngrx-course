import { BrowserModule } from "@angular/platform-browser";
import { NgModule, isDevMode } from "@angular/core";

import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatMenuModule } from "@angular/material/menu";
import { MatIconModule } from "@angular/material/icon";

import { MatListModule } from "@angular/material/list";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { HttpClientModule } from "@angular/common/http";

import { RouterModule, Routes } from "@angular/router";
import { AuthModule } from "./auth/auth.module";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "../environments/environment";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { reducers, metaReducers } from "./reducers";
import { AuthGuard } from "./auth.guard";
import { EffectsModule } from "@ngrx/effects";
import { StoreRouterConnectingModule } from "@ngrx/router-store";
import { RouterState } from "@ngrx/router-store/src";
import * as fromCourses from "./courses/reducers/";
import { EntityDataModule } from "@ngrx/data";

const routes: Routes = [
  {
    path: "courses",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./courses/courses.module").then((m) => m.CoursesModule),
  },
  {
    path: "**",
    redirectTo: "/",
  },
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    AuthModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    MatMenuModule,
    MatIconModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatToolbarModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictActionSerializability: true,
        strictStateSerializability: true,
      },
    }),
    StoreModule.forFeature(
      fromCourses.coursesFeatureKey,
      fromCourses.coursesReducer
    ),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot({
      stateKey: "router",
      routerState: RouterState.Minimal,
    }),
    //NgRx Data
    EntityDataModule.forRoot({}),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
