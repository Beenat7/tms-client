import { Temporal } from "@js-temporal/polyfill";
// Exercise 3: Type Guard for safe external data narrowing
export function isStudent(value) {
    return (typeof value === "object" &&
        value !== null &&
        "id" in value &&
        "name" in value &&
        typeof value.id === "string" &&
        typeof value.name === "string");
}
// Exercise 3 Part B: Parse pattern that throws on malformed API data
export function parseStudent(raw) {
    if (typeof raw !== "object" || raw === null) {
        throw new TypeError(`Expected an object, received ${raw === null ? "null" : typeof raw}`);
    }
    const obj = raw;
    if (typeof obj.id !== "string") {
        throw new TypeError(`Expected id to be a string, received ${typeof obj.id}`);
    }
    if (typeof obj.name !== "string") {
        throw new TypeError(`Expected name to be a string, received ${typeof obj.name}`);
    }
    return {
        id: obj.id,
        name: obj.name,
        enrollmentDate: Temporal.Now.instant(), // Generates current time stamp
    };
}
//# sourceMappingURL=student.model.js.map