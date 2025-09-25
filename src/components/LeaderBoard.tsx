import { User } from "@/types/user";

interface LeaderboardProps {
  users: User[];
}

export default function Leaderboard({ users }: LeaderboardProps) {
  // Ordena usuários por XP
  const sortedUsers = [...users].sort((a, b) => b.xp - a.xp);

  return (
    <div className="p-4 border rounded shadow bg-white max-w-md mx-auto mb-6">
      <h2 className="text-lg font-bold -mb-4 text-gray-800"> 🏆 Leaderboard </h2>
      <ul className="flex flex-col gap-2">
        {sortedUsers.map((user, index) => (
          <li
            key={user.id}
            className="flex items-center justify-between p-2 bg-gray-50 rounded hover:bg-gray-100 transition"
          >
            <div className="flex items-center gap-2">
              <span className="font-semibold">{index + 1}.</span>
              <span>{user.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Lv {user.level}</span>
              <span className="text-sm text-gray-600">{user.xp} XP</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
