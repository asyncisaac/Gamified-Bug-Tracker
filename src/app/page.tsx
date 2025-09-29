"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { User } from "@/types/user";
import { Bug } from "@/types/Bug";
import Leaderboard from "@/components/LeaderBoard";
import SearchBar from "@/components/SearchBar";
import StatusFilter from "@/components/StatusFilter";
import ProgressBar from "@/components/ProgressBar";
import BugCard from "@/components/BugCard";
import Profile from "@/components/Profile";
import { useGamification } from "@/hooks/useGamification";

export default function Home() {
  // Estados principais
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "open" | "in-progress" | "closed"
  >("all");
  const [bugs, setBugs] = useState<Bug[]>([]);

  // Gamificação
  const { xp, level, xpToNextLevel, addXp } = useGamification();

  // Buscar usuários

  // Estado para usuários
const [users, setUsers] = useState<User[]>([]);

// Buscar usuários
useEffect(() => {
  async function fetchUsers() {
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      console.log("USERS FRONT:", data); // 👈 só pra checar
      setUsers(data);
    } catch (err) {
      console.error("Erro ao buscar usuários:", err);
    }
  }
  fetchUsers();
}, []);

// ...



  // Buscar bugs da API
  useEffect(() => {
    async function fetchBugs() {
      try {
        const res = await fetch("/api/bugs");
        const data = await res.json();
        setBugs(data);
      } catch (err) {
        console.error("Erro ao buscar bugs:", err);
      }
    }
    fetchBugs();
  }, []);

  // Calcula pontos totais e fechados
  const { totalPoints, closedPoints } = useMemo(() => {
    const total = bugs.reduce((sum, bug) => sum + (bug.points ?? 1), 0);
    const closed = bugs
      .filter((bug) => bug.status === "closed")
      .reduce((sum, bug) => sum + (bug.points ?? 1), 0);
    return { totalPoints: total, closedPoints: closed };
  }, [bugs]);

  // Filtragem
  const filteredBugs = useMemo(() => {
    return bugs.filter((bug) => {
      const matchesSearch =
        bug.title.toLowerCase().includes(search.toLowerCase()) ||
        bug.description.toLowerCase().includes(search.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || bug.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [bugs, search, statusFilter]);

  // Fechar bug
  const handleCloseBug = useCallback(
    (id: number) => {
      setBugs((prevBugs) =>
        prevBugs.map((bug) => {
          if (bug.id === id && bug.status !== "closed") {
            addXp(bug.points ?? 1);
            return { ...bug, status: "closed" };
          }
          return bug;
        })
      );
    },
    [addXp]
  );

  return (
    <main className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl sm:text-4xl font-extrabold mb-6 text-gray-800">
        Bug Tracker Gamificado
      </h1>

      {/* Perfil */}
      <Profile level={level} xp={xp} xpToNextLevel={xpToNextLevel} />

      {/* Progresso */}
      <ProgressBar closedPoints={closedPoints} totalPoints={totalPoints} />

     
      {/* Leaderboard vindo do banco */}
      <Leaderboard users={users} />

      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <SearchBar search={search} setSearch={setSearch} />
        <StatusFilter
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />
      </div>

      {/* Lista */}
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredBugs.length > 0 ? (
          filteredBugs.map((bug) => (
            <BugCard key={bug.id} bug={bug} onClose={handleCloseBug} />
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full">
            Nenhum bug encontrado.
          </p>
        )}
      </div>
    </main>
  );
}
