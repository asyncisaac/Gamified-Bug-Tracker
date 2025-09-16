export interface Bug {
    id: number;
    title: string;
    description: string;
    status: "open" | "in-progress" | "closed";
    createdAt: string;
    points?: number// valor do bugs
}