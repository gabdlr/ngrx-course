import { Injectable } from "@angular/core";
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { filter, first, map, tap } from "rxjs/operators";
import { CourseEntityService } from "./services/course-entity.service";

@Injectable({
  providedIn: "root",
})
export class CoursesDResolver implements Resolve<boolean> {
  constructor(private courseEntityService: CourseEntityService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    this.courseEntityService.loaded$.pipe(
      tap((loaded) => {
        if (!loaded) {
          this.courseEntityService.getAll();
        }
      }),
      filter((loaded) => !!loaded),
      first()
    );
    return this.courseEntityService.getAll().pipe(map((courses) => !!courses));
  }
}
