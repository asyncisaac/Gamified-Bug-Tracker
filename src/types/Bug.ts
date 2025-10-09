export interface Bug {
  // Identificação
  id: number;
  title: string;
  description: string;
  
  // Status e Prioridade
  status: "open" | "in-progress" | "closed";
  priority?: "low" | "medium" | "high" | "critical";
  
  // Gamificação
  points?: number;
  
  // Relacionamentos
  createdBy?: number; // User ID do criador
  assignedTo?: number; // User ID do responsável
  
  // Timestamps
  createdAt?: Date;
  updatedAt?: Date;
  closedAt?: Date;
  
  // Metadata (opcional)
  tags?: string[];
  estimatedTime?: number; // em horas
}