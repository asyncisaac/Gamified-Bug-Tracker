import type { Bug } from "./Bug";

export interface User {
  id: number;
  name: string;
  level: number;
  xp: number;
  email?: string | null;
  avatar?: string | null;
  bugs?: Bug[];
  bugsResolved?: number;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}

