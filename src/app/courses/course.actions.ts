import { Update } from "@ngrx/entity";
import { createAction, props } from "@ngrx/store";
import { Course } from "./model/course";

export const LOAD_ALL_COURSES = "[Courses Resolver] Load All Courses";
export const ALL_COURSES_LOADED = "[Load Courses Effect] All Courses Loaded";
export const COURSE_UPDATED = "[Edit Course Dialog] Course Updated";
export const loadAllCourses = createAction(LOAD_ALL_COURSES);
export const allCoursesLoaded = createAction(
  ALL_COURSES_LOADED,
  props<{ courses: Course[] }>()
);
export const courseUpdated = createAction(
  COURSE_UPDATED,
  props<{ update: Update<Course> }>()
);
