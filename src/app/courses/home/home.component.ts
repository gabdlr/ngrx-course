import { Component, OnInit } from "@angular/core";
import { compareCourses, Course } from "../model/course";
import { Observable } from "rxjs";
import { defaultDialogConfig } from "../shared/default-dialog-config";
import { EditCourseDialogComponent } from "../edit-course-dialog/edit-course-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { map, shareReplay } from "rxjs/operators";
import { select, Store } from "@ngrx/store";
import { AppState } from "../../reducers";
import {
  selectAdvancedCourses,
  selectBeginnerCourses,
  selectPromoTotal,
} from "../courses.selector";
import { CourseEntityService } from "../services/course-entity.service";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  promoTotal$: Observable<number>;

  beginnerCourses$: Observable<Course[]>;

  advancedCourses$: Observable<Course[]>;

  constructor(
    private dialog: MatDialog,
    //NgRx Data
    private courseEntityService: CourseEntityService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.reload();
  }

  reload() {
    //NgRx Entities with adapter
    // this.beginnerCourses$ = this.store.pipe(select(selectBeginnerCourses));
    // this.advancedCourses$ = this.store.pipe(select(selectAdvancedCourses));
    // this.promoTotal$ = this.store.pipe(select(selectPromoTotal));

    //NgRx Data
    this.beginnerCourses$ = this.courseEntityService.entities$.pipe(
      map((courses) =>
        courses.filter((course) => course.category === "BEGINNER")
      )
    );
    this.advancedCourses$ = this.courseEntityService.entities$.pipe(
      map((courses) =>
        courses.filter((course) => course.category === "ADVANCED")
      )
    );
    this.promoTotal$ = this.courseEntityService.entities$.pipe(
      map((courses) => courses.filter((course) => course.promo).length)
    );
  }

  onAddCourse() {
    const dialogConfig = defaultDialogConfig();

    dialogConfig.data = {
      dialogTitle: "Create Course",
      mode: "create",
    };

    this.dialog.open(EditCourseDialogComponent, dialogConfig);
  }
}
