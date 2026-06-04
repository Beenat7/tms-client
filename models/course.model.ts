import { Temporal } from "@js-temporal/polyfill";

export interface Course {
  readonly id: string;
  title: string;
  capacity: number;
  startDate?: Temporal.PlainDate; // Date without timezone bias (e.g., YYYY-MM-DD)
}


export type CourseStatus =
| { status: "DRAFT"; createdBy: string; createdAt: Temporal.Instant }
| { status: "PUBLISHED"; publishedAt: Temporal.Instant; syllabus: string }
| {
status: "ACTIVE";
enrolledCount: number;
startDate: Temporal.PlainDate;
}
| {
status: "ARCHIVED";
archivedAt: Temporal.Instant;
finalEnrollmentCount: number;
}
| { status: "CANCELLED"; reason: string; cancelledAt: Temporal.Instant };


export function describeCourse(status: CourseStatus): string {
  switch (status.status) {
    case "DRAFT":
      return `Draft created by ${status.createdBy} on ${status.createdAt}`;
    case "PUBLISHED":
      return `Published for reviews. Syllabus details: ${status.syllabus}`;
    case "ACTIVE":
      return `Active with ${status.enrolledCount} students since ${status.startDate}`;
    case "ARCHIVED":
      return `Archived on ${status.archivedAt} with ${status.finalEnrollmentCount} students closed out`;
    case "CANCELLED":
      return `Course cancelled due to: ${status.reason}`;
    default: {
      // Hard never safety shield
      const _check: never = status;
      throw new Error(`Unhandled course state: ${JSON.stringify(_check)}`);
    }
  }
}

