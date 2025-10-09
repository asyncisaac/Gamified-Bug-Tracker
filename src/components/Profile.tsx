interface ProfileProps {
    level: number;
    xp: number;
    xpToNextLevel: number;
}

export default function Profile({ level, xp, xpToNextLevel }: ProfileProps) {
    const isMaxLevel = xpToNextLevel === 0;
    const percent = isMaxLevel ? 100 : Math.round((xp / xpToNextLevel) * 100);
    const displayXpToNext = isMaxLevel ? "MAX" : xpToNextLevel;

    // Cores dinâmicas baseadas no nível
    const getLevelColor = () => {
        if (level >= 50) return "from-purple-600 to-pink-600";
        if (level >= 25) return "from-blue-500 to-purple-500";
        if (level >= 10) return "from-green-500 to-blue-500";
        return "from-gray-600 to-gray-700";
    };

    const getLevelBadge = () => {
        if (level >= 50) return "🏆 Lenda";
        if (level >= 25) return "⭐ Veterano";
        if (level >= 10) return "🔥 Intermediário";
        return "🌱 Iniciante";
    };

    return (
        <div className="p-6 border border-gray-200 rounded-xl bg-white shadow-lg mb-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    🎮 Perfil do Jogador
                </h2>
                <span className="px-3 py-1 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-800 text-sm font-semibold rounded-full border border-purple-200">
                    {getLevelBadge()}
                </span>
            </div>

            {/* Level Info */}
            <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                        {level}
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">Nível atual</p>
                        <p className={`text-xl font-bold bg-gradient-to-r ${getLevelColor()} bg-clip-text text-transparent`}>
                            Nível {level}
                        </p>
                    </div>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-3">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Progresso para o próximo nível</span>
                    <span className="font-semibold">{percent}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
                    <div
                        style={{ width: `${percent}%` }}
                        className={`h-full bg-gradient-to-r ${getLevelColor()} rounded-full transition-all duration-1000 ease-out transform hover:scale-105`}
                    />
                </div>
            </div>

            {/* XP Info */}
            <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">
                    <strong className="text-gray-800">{xp} XP</strong> acumulados
                </span>
                <span className={`font-bold ${isMaxLevel ? 'text-yellow-600' : 'text-gray-700'}`}>
                    {isMaxLevel ? '🎉 Nível Máximo!' : `${displayXpToNext} XP para o próximo`}
                </span>
            </div>

            {/* Achievement Badge quando atingir nível máximo */}
            {isMaxLevel && (
                <div className="mt-4 p-3 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-lg text-white text-center font-bold animate-pulse">
                    🏆 PARABÉNS! Você alcançou o nível máximo! 🏆
                </div>
            )}
        </div>
    );
}