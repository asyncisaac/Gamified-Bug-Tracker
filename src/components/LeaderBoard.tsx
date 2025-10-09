import { User } from "@/types/user";
import { useMemo } from "react";

interface LeaderboardProps {
  users: User[];
  isLoading?: boolean;
}

// Componente de item separado para melhor performance
const LeaderboardItem = ({ user, rank }: { user: User; rank: number }) => {
  const rankColor = useMemo(() => {
    const colors = [
      "bg-yellow-50 border-yellow-200", // 1º
      "bg-gray-50 border-gray-200",     // 2º  
      "bg-orange-50 border-orange-200", // 3º
      "bg-white border-gray-100"        // outros
    ];
    return colors[Math.min(rank - 1, 3)];
  }, [rank]);

  return (
    <li
      role="listitem"
      aria-label={`${rank}º lugar: ${user.name} nível ${user.level} com ${user.xp} XP`}
      className={`flex items-center justify-between p-3 border rounded-lg transition-all hover:shadow-md ${rankColor}`}
    >
      <div className="flex items-center gap-3">
        <span className={`font-bold ${
          rank <= 3 ? "text-lg" : "text-base"
        }`}>
          {rank}º
        </span>
        <span className="font-medium text-gray-800">{user.name}</span>
      </div>
      <div className="flex items-center gap-3 text-sm">
        <span className="text-gray-600">Nv {user.level}</span>
        <span className="font-semibold text-gray-800">{user.xp} XP</span>
      </div>
    </li>
  );
};

export default function Leaderboard({ users, isLoading }: LeaderboardProps) {
  const sortedUsers = useMemo(() => 
    [...users].sort((a, b) => b.xp - a.xp), 
    [users]
  );

  if (isLoading) {
    return (
      <div className="p-4 border rounded-lg bg-white max-w-md mx-auto mb-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-12 bg-gray-100 rounded mb-2"></div>
          ))}
        </div>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="p-6 border rounded-lg bg-white max-w-md mx-auto mb-6 text-center">
        <div className="text-gray-400 text-4xl mb-2">🏆</div>
        <p className="text-gray-500 font-medium">Ranking Vazio</p>
        <p className="text-sm text-gray-400">Os usuários aparecerão aqui</p>
      </div>
    );
  }

  return (
    <section aria-label="Classificação dos usuários por experiência">
      <div className="p-4 border rounded-lg shadow-sm bg-white max-w-md mx-auto mb-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
          <span>🏆</span>
          Leaderboard
        </h2>
        
        <ol className="flex flex-col gap-2" role="list">
          {sortedUsers.map((user, index) => (
            <LeaderboardItem 
              key={user.id} 
              user={user} 
              rank={index + 1} 
            />
          ))}
        </ol>
      </div>
    </section>
  );
}