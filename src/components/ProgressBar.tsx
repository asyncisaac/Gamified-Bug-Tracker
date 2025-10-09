interface ProgressBarProps {
  closedPoints: number;
  totalPoints: number;
}

export default function ProgressBar({ closedPoints, totalPoints }: ProgressBarProps) {
  const percent = totalPoints > 0 ? Math.round((closedPoints / totalPoints) * 100) : 0;

  const getProgressColor = () => {
    if (percent >= 90) return "bg-gradient-to-r from-green-500 to-emerald-500";
    if (percent >= 70) return "bg-gradient-to-r from-green-400 to-green-500";
    if (percent >= 50) return "bg-gradient-to-r from-yellow-400 to-amber-500";
    if (percent >= 25) return "bg-gradient-to-r from-orange-400 to-orange-500";
    return "bg-gradient-to-r from-red-400 to-red-500";
  };

  const getCompletionText = () => {
    if (percent === 100) return "🎉 Todos os bugs resolvidos!";
    if (percent >= 80) return "🔥 Excelente progresso!";
    if (percent >= 60) return "💪 Continue assim!";
    if (percent >= 30) return "👌 Bom começo!";
    return "🚀 Vamos começar!";
  };

  return (
    <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-white shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">
          Progresso Geral
        </span>
        <span className="text-sm font-semibold text-gray-800">
          {closedPoints} / {totalPoints} ({percent}%)
        </span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
        <div
          style={{ width: `${percent}%` }}
          className={`h-full rounded-full transition-all duration-1000 ease-out ${getProgressColor()}`}
        />
      </div>

      {totalPoints > 0 && (
        <p className="text-xs text-center text-gray-500 mt-2 font-medium">
          {getCompletionText()}
        </p>
      )}
    </div>
  );
}