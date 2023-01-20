import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DefaultDataService, HttpUrlGenerator } from "@ngrx/data";
import { Lesson } from "../model/lesson";

@Injectable({
  providedIn: "root",
})
export class LessonsDataService extends DefaultDataService<Lesson> {
  constructor(
    private httpClient: HttpClient,
    httpUrlGenerator: HttpUrlGenerator
  ) {
    super("Lesson", httpClient, httpUrlGenerator);
  }
}
