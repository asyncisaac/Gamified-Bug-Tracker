
interface ProfileProps{
    
    level:number;
    xp: number;
    xpToNextLevel: number;
}

export default function Profile({level, xp, xpToNextLevel }: ProfileProps) {
    const percent = Math.round((xp / xpToNextLevel) * 100);

    return (
        <div className="p-4 border rounded bg-white shadow mb-4 flex flex-col gap-2">
            <h2 className="text-lg font-bold"> 🎮 Perfil Do Usuário</h2>    
            <p>Nível: {level}</p>
            <div className="w-full bg-gray-200 h-3 rounded">
                <div
                style={{width: `${percent}%` }}
                className="h-3 bg-purple-500 rounded trasition-all duration-500"
            ></div>
        </div>
        <p className="text-sm text-gray-600">{xp} / {xpToNextLevel} XP</p>
        </div>
    );
}