import { Bug } from "@/types/Bug";

interface BugCardProps {
  bug: Bug;
  onClose: (id: number) => void;
}

export default function BugCard({ bug, onClose }: BugCardProps) {
  const isClosed: boolean = bug.status === "closed";

  return (
    <div className={`p-4 border rounded shadow flex flex-col gap-2 transition-transform hover:scale-105 bg-white`}>
      <h2 className="text-lg font-bold">{bug.title}</h2>
      <p className="text-gray-700">{bug.description}</p>
      <span
        className={`px-2 py-1 rounded text-sm ${
          isClosed ? "bg-green-500 text-white" : "bg-yellow-300 text-black"
        }`}
      >
        {bug.status.replace("-", " ")}
      </span>
      {!isClosed && (
        <button
            className={`mt-2 px-3 py-1 rounded transition-colors ${
              isClosed ? "bg-gray-300 text-gray-600 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              onClick={() => !isClosed && onClose(bug.id)}
              title={isClosed ? "Este bug já está fechado" : "Marcar como fechado"}
        >
          Marcar Fechado
        </button>
      )}
    </div>
  );
}
