// Separating the runtime functions from the compile-time Type
import { isStudent, parseStudent } from "./models/student.model.js";
import type { Student } from "./models/student.model.js"; // Explicitly marked as a type!
import { calculateGrade } from "./models/assessment.model.js";
import type { AssessmentItem } from "./models/assessment.model.js";

import { describeEnrollment } from "./models/enrollment.model.js";
import type { EnrollmentStatus } from "./models/enrollment.model.js";

import { describeCourse } from "./models/course.model.js";
import type { CourseStatus } from "./models/course.model.js";

import { renderResponse } from "./models/api-response.model.js";
import type { ApiResponse } from "./models/api-response.model.js";
import type { Course } from "./models/course.model.js"; 

import { Temporal } from "@js-temporal/polyfill";

console.log("TMS Client System Online");

// --- Your Test Cases ---
const student: Student = {
  id: "STU-001",
  name: "Hana Tadesse",
  enrollmentDate: Temporal.Now.instant()
};

console.log(student.gpa?.toFixed(2) ?? "Not yet graded"); 

if (isStudent({ id: "STU-001", name: "Hana" })) {
  console.log("Type guard verified: Hana is a valid student structure.");
}

try {
  parseStudent({ id: 42, name: "Test" });
} catch (error) {
  if (error instanceof Error) {
    console.log(`Parse validation caught error perfectly: ${error.message}`);
  }
}



const quiz: AssessmentItem = {
id: "QUIZ-001",
kind: "quiz",
title: "SQL Basics",
correctAnswers: 8,
totalQuestions: 10,
};
const lab: AssessmentItem = {
id: "LAB-001",
kind: "lab",
title: "REST API Project",
functionalityScore: 85,
codeQualityScore: 90,
};
console.log(`Quiz grade: ${calculateGrade(quiz)}%`); // 80
console.log(`Lab grade: ${calculateGrade(lab)}%`); // 87
// Verify readonly try this line and check the compiler error:
//quiz.id = "QUIZ-999";
// ERROR: Cannot assign to 'id' because it is a read-only property


const pendingEnrollment: EnrollmentStatus = {
  status: "PENDING",
  requestedAt: Temporal.Now.instant(),
  studentId: "STU-001",
  courseId: "CRS-101"
};
console.log(describeEnrollment(pendingEnrollment));

const activeCourse: CourseStatus = {
  status: "ACTIVE",
  enrolledCount: 28,
  startDate: Temporal.PlainDate.from("2026-09-01")
};
console.log(describeCourse(activeCourse));


// --- NEW EXERCISE 6 TEST CASES (Generics) ---
// Test Case A: Testing with a single Student object
const studentPayload: ApiResponse<Student> = {
  status: "success",
  data: {
    id: "STU-001",
    name: "Dawit Bekele",
    enrollmentDate: Temporal.Now.instant(),
    gpa: 3.4
  },
  fetchedAt: Temporal.Now.instant()
};

// Prints the single student data cleanly
console.log(
  renderResponse(studentPayload, (s) => `Student: ${s.name} | GPA: ${s.gpa ?? "N/A"}`)
);

// Test Case B: Testing with an array of Course objects
const courseListPayload: ApiResponse<Course[]> = {
  status: "success",
  data: [
    { id: "CRS-101", title: "Web Development Fundamentals", capacity: 30 },
    { id: "CRS-102", title: "Advanced C# and .NET 10", capacity: 25 }
  ],
  fetchedAt: Temporal.Now.instant()
};

// Loops over the courses array passed to the formatter callback
console.log(
  renderResponse(courseListPayload, (courses) => 
    `Courses available: ${courses.map((c) => c.title).join(", ")}`
  )
);

// Test Case C: Testing an error state
const brokenPayload: ApiResponse<Student> = {
  status: "error",
  message: "Unauthorized token access mapping failed.",
  statusCode: 401
};
// Explicitly add ": Student" inside the arrow function parameters
console.log(renderResponse(brokenPayload, (s: Student) => s.name));


