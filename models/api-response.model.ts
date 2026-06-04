import { Temporal } from "@js-temporal/polyfill";
export type ApiResponse<T> =
| { status: "loading" }
| { status: "success"; data: T; fetchedAt: Temporal.Instant }
| { status: "error"; message: string; statusCode: number };
export function renderResponse<T>(
  response: ApiResponse<T>,
  formatter: (data: T) => string
): string {
  switch (response.status) {
    case "loading":
      return "Loading...";
    case "success":
      // Because we are inside the "success" case branch, 
      // TypeScript automatically knows that response.data exists and is of type T!
      return formatter(response.data);
    case "error":
      return `Error [${response.statusCode}]: ${response.message}`;
  }
}



