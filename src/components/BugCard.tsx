import { Bug } from "@/types/Bug";
import { useState } from "react";

interface BugCardProps {
  bug: Bug;
  onClose: (id: number) => void;
}

// Configuração de status
const statusConfig = {
  open: { 
    bg: "bg-red-100", 
    text: "text-red-800", 
    border: "border-red-300",
    label: "Aberto"
  },
  "in-progress": { 
    bg: "bg-blue-100", 
    text: "text-blue-800", 
    border: "border-blue-300",
    label: "Em Progresso"
  },
  closed: { 
    bg: "bg-green-100", 
    text: "text-green-800", 
    border: "border-green-300",
    label: "Fechado"
  }
};

export default function BugCard({ bug, onClose }: BugCardProps) {
  const [isClosing, setIsClosing] = useState(false);
  const isClosed = bug.status === "closed";
  const status = statusConfig[bug.status];

  const handleClose = async () => {
    if (isClosed || isClosing) return;
    
    setIsClosing(true);
    try {
      await onClose(bug.id);
    } catch (error) {
      console.error("Erro ao fechar bug:", error);
    } finally {
      setIsClosing(false);
    }
  };

  return (
    <div className={`
      p-4 border rounded-lg shadow-sm flex flex-col gap-3 
      transition-all hover:shadow-md bg-white
      ${status.border} border-l-4
    `}>
      {/* Header com título e pontos */}
      <div className="flex justify-between items-start gap-2">
        <h2 className="text-lg font-bold text-gray-800 flex-1">
          {bug.title}
        </h2>
        
        {/* Pontos - SÓ aparece se existir e for > 0 */}
        {bug.points && bug.points > 0 && (
          <span className="px-2 py-1 bg-purple-100 text-purple-800 text-sm font-medium rounded min-w-8 text-center">
            {bug.points} XP
          </span>
        )}
      </div>

      {/* Descrição */}
      <p className="text-gray-600 text-sm leading-relaxed">
        {bug.description}
      </p>

      {/* Status e Botão */}
      <div className="flex items-center justify-between mt-auto">
        <span className={`
          px-3 py-1 rounded-full text-xs font-medium
          ${status.bg} ${status.text}
        `}>
          {status.label}
        </span>

        {/* Botão só aparece se NÃO estiver fechado */}
        {!isClosed && (
          <button
            onClick={handleClose}
            disabled={isClosing}
            className={`
              px-4 py-2 rounded text-sm font-medium transition-all
              ${isClosing 
                ? "bg-gray-300 text-gray-600 cursor-not-allowed" 
                : "bg-blue-500 text-white hover:bg-blue-600 active:scale-95"
              }
            `}
            title={isClosing ? "Fechando..." : "Marcar como fechado"}
          >
            {isClosing ? "Fechando..." : "Fechar Bug"}
          </button>
        )}
      </div>

      {/* ID do bug para debug (opcional) */}
      <div className="flex justify-between items-center text-xs text-gray-500 mt-1">
        <span>ID: #{bug.id}</span>
        {/* Mostra pontos mesmo quando 0 para transparência */}
        <span>{bug.points || 1} ponto{bug.points !== 1 ? 's' : ''}</span>
      </div>
    </div>
  );
}