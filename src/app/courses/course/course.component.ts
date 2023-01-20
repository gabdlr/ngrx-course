import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit,
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Course } from "../model/course";
import { Observable, of } from "rxjs";
import { Lesson } from "../model/lesson";
import {
  concatMap,
  delay,
  filter,
  first,
  map,
  shareReplay,
  tap,
  withLatestFrom,
} from "rxjs/operators";
import { CoursesHttpService } from "../services/courses-http.service";
import { CourseEntityService } from "../services/course-entity.service";
import { LessonsEntityService } from "../services/lessons-entity.service";

@Component({
  selector: "course",
  templateUrl: "./course.component.html",
  styleUrls: ["./course.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseComponent implements OnInit {
  course$: Observable<Course>;
  displayedColumns = ["seqNo", "description", "duration"];
  lessons$: Observable<Lesson[]>;
  loading$: Observable<boolean>;
  nextPage = 0;

  constructor(
    private coursesEntityService: CourseEntityService,
    private lessonsEntityService: LessonsEntityService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const courseUrl = this.route.snapshot.paramMap.get("courseUrl");

    this.course$ = this.coursesEntityService.entities$.pipe(
      map((courses) => courses.find((course) => course.url === courseUrl))
    );

    this.lessons$ = this.lessonsEntityService.entities$.pipe(
      withLatestFrom(this.course$),
      tap(([lesson, course]) => {
        if (this.nextPage === 0) {
          this.loadLessonsPage(course);
        }
      }),
      map(([lessons, course]) =>
        lessons.filter((lesson) => lesson.courseId === course.id)
      )
    );

    this.loading$ = this.lessonsEntityService.loading$.pipe(delay(0));
  }

  loadLessonsPage(course: Course) {
    this.lessonsEntityService.getWithQuery({
      courseId: course.id.toString(),
      pageNumber: this.nextPage.toString(),
      pageSize: "3",
    });
    this.nextPage++;
  }
}
