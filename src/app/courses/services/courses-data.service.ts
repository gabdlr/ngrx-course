//NgRx Data
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DefaultDataService, HttpUrlGenerator } from "@ngrx/data";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Course } from "../model/course";

@Injectable({
  providedIn: "root",
})
export class CoursesDataService extends DefaultDataService<Course> {
  constructor(
    private httpClient: HttpClient,
    httpUrlGenerator: HttpUrlGenerator
  ) {
    super("Course", httpClient, httpUrlGenerator);
  }
  //Overrides getAll, as ngrx is expecting to recive a Courses[] and we are reciving {payload:Courses[]}
  getAll(): Observable<Course[]> {
    return this.httpClient
      .get<{ payload: Course[] }>("/api/courses")
      .pipe(map((response) => response.payload));
  }
}
