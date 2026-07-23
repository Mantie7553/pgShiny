import { useState, useEffect } from "react";
import { LayoutGrid, List } from "lucide-react";
import { getAllPokemon } from "../api/pokemon";
import type { Pokemon } from "../types/pokemon";
import PokemonGrid from "../components/PokemonGrid";
import PokemonList from "../components/PokemonList";
import PokemonModal from "../components/PokemonModal";

type ViewMode = "grid" | "list";

export default function PokedexPage() {
    const [pokemon, setPokemon] = useState<Pokemon[]>([]);
    const [loading, setLoading] = useState(true);
    const [view, setView] = useState<ViewMode>("grid");
    const [selectedId, setSelectedId] = useState<number | null>(null);

    useEffect(() => {
        getAllPokemon()
            .then(data => setPokemon(data.sort((a,b) => a.id - b.id)))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="bg-white shadow-sm sticky top-0 z-20 px-6 py-4 flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-800">PG Shiny</h1>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setView("grid")}
                        className={`p-2 rounded-lg transition-colors ${view === "grid" ? "bg-gray-200 text-gray-800" : "text-gray-400 hover:text-gray-600"}`}
                    >
                        <LayoutGrid size={20} />
                    </button>
                    <button
                        onClick={() => setView("list")}
                        className={`p-2 rounded-lg transition-colors ${view === "list" ? "bg-gray-200 text-gray-800" : "text-gray-400 hover:text-gray-600"}`}
                    >
                        <List size={20} />
                    </button>
                </div>
            </div>

            <div className="max-w-screen-xl mx-auto">
                {loading ? (
                    <div className="flex items-center justify-center h-64 text-gray-400">Loading...</div>
                ) : view === "grid" ? (
                    <PokemonGrid pokemon={pokemon} onSelect={setSelectedId} />
                ) : (
                    <PokemonList pokemon={pokemon} onSelect={setSelectedId} />
                )}
            </div>
            <PokemonModal pokemonId={selectedId} onClose={() => setSelectedId(null)} />
        </div>
    );
}