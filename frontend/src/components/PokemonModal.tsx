import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { getPokemon } from "../api/pokemon";
import type { Pokemon } from "../types/pokemon";
import ShinyBadge from "./ShinyBadge";
import TypeBadge from "./TypeBadge";
import { formatMethod, toRoman } from "../utils/generation";

const genRegions: Record<number, string> = {
    1: 'Kanto', 2: 'Johto', 3: 'Hoenn', 4: 'Sinnoh',
    5: 'Unova', 6: 'Kalos', 7: 'Alola', 8: 'Galar', 9: 'Paldea'
};

const SHINY_BASE = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny';

interface Props {
    pokemonId: number | null;
    onClose: () => void;
}

export default function PokemonModal({ pokemonId, onClose }: Props) {
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const [loading, setLoading] = useState(false);
    const [showingShiny, setShowingShiny] = useState(false);

    useEffect(() => {
        if (pokemonId === null) {
            setPokemon(null);
            setShowingShiny(false);
            return;
        }
        setLoading(true);
        setShowingShiny(false);
        getPokemon(pokemonId)
            .then(setPokemon)
            .finally(() => setLoading(false));
    }, [pokemonId]);

    if (pokemonId === null) return null;

    const region = pokemon ? (genRegions[pokemon.generation] ?? 'Unknown') : '';
    const spriteUrl = pokemon
        ? showingShiny
            ? `${SHINY_BASE}/${pokemon.id}.png`
            : pokemon.spriteUrl
        : '';

    return (
        <>
            <div
                className="fixed inset-0 bg-black/40 z-30 transition-opacity"
                onClick={onClose}
            />

            <div className="fixed top-0 right-0 h-full w-full max-w-3xl bg-white z-40 shadow-2xl flex flex-col">

                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
                    <div className="flex items-center gap-3">
                        {pokemon && (
                            <>
                                <span className="text-sm text-gray-400">#{String(pokemon.id).padStart(4, '0')}</span>
                                <h2 className="text-xl font-bold text-gray-800 capitalize">{pokemon.name}</h2>
                                {pokemon.isShinyAvailable && <ShinyBadge positioned={false} />}
                            </>
                        )}
                    </div>
                    <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                        <X size={20} className="text-gray-500" />
                    </button>
                </div>

                {loading && (
                    <div className="flex-1 flex items-center justify-center text-gray-400">Loading...</div>
                )}

                {!loading && pokemon && (
                    <div className="flex flex-1 overflow-hidden">

                        <div className="w-64 min-w-64 shrink-0 bg-gray-50 flex flex-col items-center justify-center gap-4 p-6 border-r border-gray-100">
                            <img
                                src={spriteUrl}
                                alt={pokemon.name}
                                className="w-48 h-48 object-contain transition-opacity duration-300"
                            />

                            {pokemon.isShinyAvailable ? (
                                <button
                                    onClick={() => setShowingShiny(s => !s)}
                                    className={`text-xs font-semibold px-4 py-1.5 rounded-full border transition-colors ${
                                        showingShiny
                                            ? 'bg-yellow-400 border-yellow-400 text-white'
                                            : 'bg-white border-gray-300 text-gray-500 hover:border-yellow-400 hover:text-yellow-500'
                                    }`}
                                >
                                    {showingShiny ? '✦ Shiny' : 'View Shiny'}
                                </button>
                            ) : (
                                <span className="text-xs text-gray-400">No shiny available</span>
                            )}

                            <div className="flex gap-2 flex-wrap justify-center">
                                {pokemon.types.split(',').map(t => (
                                    <TypeBadge key={t} type={t} />
                                ))}
                            </div>

                            <span className="text-xs text-gray-400">
                                {region} · Gen {toRoman(pokemon.generation)}
                            </span>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6">
                            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Shiny Methods</h3>

                            {pokemon.shinyMethods.length === 0 ? (
                                <p className="text-gray-400 text-sm">No shiny methods recorded yet.</p>
                            ) : (
                                <div className="flex flex-col gap-3">
                                    {pokemon.shinyMethods.map(m => (
                                        <div key={m.id} className="bg-gray-50 rounded-xl p-4 flex items-start justify-between gap-4">
                                            <div className="flex flex-col gap-1">
                                                <span className="font-semibold text-gray-800">{formatMethod(m.method)}</span>
                                                {m.notes && <span className="text-xs text-gray-400">{m.notes}</span>}
                                            </div>
                                            <span className="text-sm font-bold text-yellow-500 shrink-0">{m.odds}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}