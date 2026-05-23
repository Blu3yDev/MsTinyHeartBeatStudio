/**
 * Weekly timetable. Sourced from the client information pack —
 * confirm the current schedule with the studio before launch.
 */

export type ScheduleRow = {
  group: string;
  age: string;
  days: string;
  time: string;
};

export const schedule: ScheduleRow[] = [
  { group: "Mini Kids", age: "4 – 6 yrs", days: "Mon & Wed", time: "15:00 – 16:00" },
  { group: "Tiny Tots", age: "7 – 9 yrs", days: "Mon & Wed", time: "15:00 – 16:00" },
  { group: "Juveniles", age: "10 – 12 yrs", days: "Mon & Wed", time: "16:00 – 17:00" },
  { group: "Juniors", age: "13 – 15 yrs", days: "Mon & Wed", time: "16:00 – 17:00" },
  { group: "Adults & Masters", age: "16+ yrs", days: "Mon & Wed", time: "17:30 – 18:30" },
  { group: "In-School Dance Programme", age: "School groups", days: "Tue, Thu & Fri", time: "15:15 – 16:15" },
  { group: "Little Ones", age: "4 – 5 yrs", days: "Saturday", time: "09:00 – 10:00" },
  { group: "Private Lessons & Programmes", age: "All ages", days: "Sat & Sun", time: "11:00 – 17:00" },
];
