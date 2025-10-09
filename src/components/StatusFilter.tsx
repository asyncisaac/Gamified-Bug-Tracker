interface StatusFilterProps {
  statusFilter: "all" | "open" | "in-progress" | "closed";
  setStatusFilter: (value: "all" | "open" | "in-progress" | "closed") => void;
}

export default function StatusFilter({ statusFilter, setStatusFilter }: StatusFilterProps) {
  const filters: { label: string; value: "all" | "open" | "in-progress" | "closed" }[] = [
    { label: "Todos", value: "all" },
    { label: "Abertos", value: "open" },
    { label: "Em Progresso", value: "in-progress" },
    { label: "Fechados", value: "closed" },
  ];

  const getFilterStyle = (filterValue: string) => {
    const baseClasses = "px-4 py-2 rounded-lg font-medium transition-all duration-200 border text-sm flex items-center gap-2";
    
    if (statusFilter === filterValue) {
      const activeColors = {
        'all': 'bg-blue-500 text-white border-blue-500 shadow-sm',
        'open': 'bg-red-500 text-white border-red-500 shadow-sm', 
        'in-progress': 'bg-yellow-500 text-white border-yellow-500 shadow-sm',
        'closed': 'bg-green-500 text-white border-green-500 shadow-sm'
      };
      return `${baseClasses} ${activeColors[filterValue]}`;
    }
    
    return `${baseClasses} bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400 hover:shadow-sm`;
  };

  const getFilterIcon = (value: "all" | "open" | "in-progress" | "closed") => {
  const icons: Record<"all" | "open" | "in-progress" | "closed", string> = {
    'all': '🔍',
    'open': '🟡', 
    'in-progress': '🔵',
    'closed': '✅'
  };
  return icons[value];
};

  return (
    <div className="flex gap-2 mb-4 flex-wrap">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => setStatusFilter(filter.value)}
          className={getFilterStyle(filter.value)}
          aria-pressed={statusFilter === filter.value}
          aria-label={`Filtrar por ${filter.label}`}
        >
          <span>{getFilterIcon(filter.value)}</span>
          {filter.label}
        </button>
      ))}
    </div>
  );
}