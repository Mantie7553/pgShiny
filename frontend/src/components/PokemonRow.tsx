import type { Pokemon } from "../types/pokemon";
import ShinyBadge from "./ShinyBadge";
import TypeBadge from "./TypeBadge";

interface Props {
    pokemon: Pokemon;
    onClick: (id: number) => void;
}

export default function PokemonRow({ pokemon, onClick }: Props) {
    return (
        <div
            onClick={() => onClick(pokemon.id)}
            className="flex items-center gap-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer px-4 py-2"
        >
            <span className="text-xs text-gray-400 w-12 shrink-0">#{String(pokemon.id).padStart(4, '0')}</span>

            <img
                src={pokemon.spriteUrl}
                alt={pokemon.name}
                className="w-12 h-12 object-contain shrink-0"
            />

            <span className="font-semibold text-gray-800 capitalize w-32 shrink-0">{pokemon.name}</span>

            <div className="flex gap-1 flex-wrap">
                {pokemon.types.split(',').map(t => (
                    <TypeBadge key={t} type={t} />
                ))}
            </div>

            <span className="text-xs text-gray-400 ml-auto shrink-0">Gen {pokemon.generation}</span>

            {pokemon.isShinyAvailable && (
                <div className="shrink-0">
                    <ShinyBadge positioned={false}/>
                </div>
            )}
        </div>
    );
}