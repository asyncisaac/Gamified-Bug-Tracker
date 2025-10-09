import { Bug } from "./Bug";
export interface User {


  // Identificação
  id: number;
  name: string;
  avatar?: string;
  email?: string;

  // Gamificação
  xp: number;
  level: number;

   // Relacionamentos
   bugs?: Bug[];

   // Timestamps
  createdAt?: Date;
  updatedAt?: Date;

  // Métricas
  totalBugsResolved?: number;
  currentStreak?: number;
}
// src/types/user.ts
export interface User {
  id: number;
  name: string;
  level: number;
  xp: number;
  email?: string;
  avatar?: string;
  bugsResolved?: number; // 👈 Adicione este campo
}