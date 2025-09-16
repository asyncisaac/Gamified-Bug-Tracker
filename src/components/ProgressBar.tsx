interface ProgressBarProps {
  closedPoints: number;
  totalPoints: number;
}

export default function ProgressBar({ closedPoints, totalPoints }: ProgressBarProps) {
  const percent = totalPoints > 0 ? Math.round((closedPoints / totalPoints) * 100) : 0;
  const progressColor = percent > 75 ? "bg-green-500" : percent > 40 ? "bg-yellow-400" : "bg-red-500";

  return (
    <div className="mb-4">
      <div className="w-full bg-gray-200 h-4 rounded">
        <div
          style={{ width: `${percent}%` }}
          className="h-4 bg-green-500 rounded transition-all duration-500"
        ></div>
      </div>
      <p className="text-sm text-gray-600 mt-1">
        {closedPoints} / {totalPoints} pontos concluídos ({percent}%)
      </p>

    </div>
  );
}