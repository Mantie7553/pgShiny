import type { Pokemon } from "../types/pokemon";
import ShinyBadge from "./ShinyBadge";
import TypeBadge from "./TypeBadge";

interface Props {
    pokemon: Pokemon;
    onClick: (id: number) => void;
}

export default function PokemonCard({ pokemon, onClick }: Props) {
    return (
        <div
            onClick={() => onClick(pokemon.id)}
            className={`relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow cursor-pointer p-4 flex flex-col items-center gap-2 w-48`}
        >
            {pokemon.isShinyAvailable && (
                <ShinyBadge/>
            )}

            <span className="text-xs text-gray-400 self-start">#{String(pokemon.id).padStart(4, '0')}</span>

            <img
                src={pokemon.spriteUrl}
                alt={pokemon.name}
                className="w-28 h-28 object-contain"
            />

            <span className="font-semibold text-gray-800 capitalize">{pokemon.name}</span>

            <div className="flex gap-1 flex-wrap justify-center">
                {pokemon.types.split(',').map(t => (
                    <TypeBadge key={t} type={t} />
                ))}
            </div>
        </div>
    );
}