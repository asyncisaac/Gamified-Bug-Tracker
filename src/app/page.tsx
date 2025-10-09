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

// Custom Hooks Users
const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true);
        const res = await fetch("/api/users");
        if (!res.ok) throw new Error('Falha ao buscar usuários');
        const data = await res.json();
        setUsers(data.users);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  return { users, loading, error };
};

// Custom Hook Bugs - CORRIGIDO
const useBugs = () => {
  const [bugs, setBugs] = useState<Bug[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBugs() {
      try {
        setLoading(true);
        const res = await fetch("/api/bugs");
        if (!res.ok) throw new Error('Falha ao buscar bugs');
        const data = await res.json();
        setBugs(data.bugs);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    }
    fetchBugs();
  }, []);

  // 👇 CORREÇÃO - TIPAGEM EXPLÍCITA
  const updateBugs = useCallback((updater: (prevBugs: Bug[]) => Bug[]) => {
    setBugs(updater);
  }, []);

  return { bugs, loading, error, setBugs: updateBugs };
};

export default function Home() {
  // Estados de filtro
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "open" | "in-progress" | "closed"
  >("all");

  // Custom Hooks
  const { users, loading: usersLoading, error: usersError } = useUsers();
  const { bugs, loading: bugsLoading, error: bugsError, setBugs } = useBugs();
  const { xp, level, xpToNextLevel, addXp } = useGamification();

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

  // Fechar bug (frontend + backend) - CORRIGIDO
  const handleCloseBug = useCallback(async (id: number) => {
    try {
      const url = `/api/bugs/${id}`;
      
      const res = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'closed' })
      });
      
      const responseText = await res.text();

      if (res.ok) {
        const updatedBug = JSON.parse(responseText);
        
        // 👇 CORREÇÃO - TIPAGEM EXPLÍCITA
        setBugs((prevBugs: Bug[]) => {
          const newBugs = prevBugs.map(bug => {
            if (bug.id === id) {
              addXp(bug.points ?? 1);
              return { ...bug, status: 'closed' as const };
            }
            return bug;
          });
          return newBugs;
        });
        
      } else {
        console.error('Erro ao fechar bug no backend:', responseText);
      }
    } catch (err) {
      console.error('Erro ao fechar bug:', err);
    }
  }, [addXp, setBugs]);

  // Loading state
  if (bugsLoading || usersLoading) {
    return (
      <main className="p-6 max-w-7xl mx-auto">
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500">Carregando...</p>
        </div>
      </main>
    );
  }

  // Error state
  if (bugsError || usersError) {
    return (
      <main className="p-6 max-w-7xl mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">Erro ao carregar dados: {bugsError || usersError}</p>
        </div>
      </main>
    );
  }

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

      {/* Lista de Bugs */}
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredBugs.length > 0 ? (
          filteredBugs.map((bug) => (
            <BugCard key={bug.id} bug={bug} onClose={handleCloseBug} />
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full">
            {bugs.length === 0 ? 'Nenhum bug cadastrado.' : 'Nenhum bug encontrado com os filtros atuais.'}
          </p>
        )}
      </div>
    </main>
  );
}