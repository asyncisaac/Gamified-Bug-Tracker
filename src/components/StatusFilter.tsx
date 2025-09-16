interface StatusFilterProps {
  statusFilter: "all" | "open" | "in-progress" | "closed";
  setStatusFilter: (value: "all" | "open" | "in-progress" | "closed") => void;
}

export default function StatusFilter({ statusFilter, setStatusFilter }: StatusFilterProps) {
  const filters: { label: string; value: "all" | "open" | "in-progress" | "closed" }[] = [
    { label: "Todos", value: "all" },
    { label: "Aberto", value: "open" },
    { label: "Em progresso", value: "in-progress" },
    { label: "Fechado", value: "closed" },
  ];

  return (
    <div className="flex gap-2 mb-4">
      {filters.map((filter) => (
        <button
          key={filter.value}
          className={`px-3 py-1 rounded transition-colors ${
            statusFilter === filter.value ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"
          }`}
          onClick={() => setStatusFilter(filter.value)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
