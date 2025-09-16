interface SearchBarProps {
  search: string;
  setSearch: (value: string) => void;
}

export default function SearchBar({ search, setSearch }: SearchBarProps) {
  return (
    <input
      type="text"
      placeholder="Buscar bug..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="border rounded p-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
    />
  );
}