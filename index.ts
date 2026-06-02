// Separating the runtime functions from the compile-time Type
import { isStudent, parseStudent } from "./models/student.model.js";
import type { Student } from "./models/student.model.js"; // Explicitly marked as a type!

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