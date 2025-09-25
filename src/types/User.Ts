import { Bug } from "./Bug";

export interface User {
  id: number;
  name: string;
  xp: number;
  level: number;
  bugs?: Bug[]; // opcional
}
