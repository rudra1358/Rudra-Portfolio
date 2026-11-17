import type { Education } from "./types";

/** `status`, `period` and `notes` are optional and hidden when empty. */
export const education: Education[] = [
  {
    id: "be-cse",
    degree: "Bachelor of Engineering",
    field: "Computer Science and Engineering",
    institution: "New LJIET",
    university: "Gujarat Technological University (GTU)",
    status: "Currently pursuing",
    period: "", // e.g. "2023 – 2027"
  },
];
